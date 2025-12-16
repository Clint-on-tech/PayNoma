from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import UserSerializer, RegisterSerializer

# Registration API
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Registration successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data,   # includes role
        }, status=status.HTTP_201_CREATED)


# JWT Login API
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and password required"}, status=400)

        # Authenticate with email as username
        user = authenticate(request, username=email, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=401)

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data
        })

# Authenticated profile
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

# Web login (template-based)
def custom_login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            role_redirects = {
                'admin': 'admin_dashboard',
                'landlord': 'landlord_dashboard',
                'tenant': 'tenant_dashboard',
                'agent': 'agent_dashboard',
                'finance': 'finance_dashboard',
                'support': 'support_dashboard',
            }
            return redirect(role_redirects.get(user.role, 'tenant_dashboard'))

        return render(request, 'users/login.html', {'form': form, 'error': 'Invalid credentials'})

    form = AuthenticationForm()
    return render(request, 'users/login.html', {'form': form})

# Dashboard views
@login_required
def admin_dashboard(request):
    return render(request, 'dashboards/admin_dashboard.html')

@login_required
def landlord_dashboard(request):
    return render(request, 'dashboards/landlord_dashboard.html')

@login_required
def tenant_dashboard(request):
    return render(request, 'dashboards/tenant_dashboard.html')

@login_required
def agent_dashboard(request):
    return render(request, 'dashboards/agent_dashboard.html')

@login_required
def finance_dashboard(request):
    return render(request, 'dashboards/finance_dashboard.html')

@login_required
def support_dashboard(request):
    return render(request, 'dashboards/support_dashboard.html')
