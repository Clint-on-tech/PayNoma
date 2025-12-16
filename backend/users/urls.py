from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    LoginView,
    UserProfileView,
    custom_login_view,
    admin_dashboard,
    landlord_dashboard,
    tenant_dashboard,
    agent_dashboard,
    finance_dashboard,
    support_dashboard,
)

urlpatterns = [
    # ---------------------------
    # API endpoints (frontend JWT)
    # ---------------------------
    path('register/', RegisterView.as_view(), name='register'),   # POST: register new user
    path('login/', LoginView.as_view(), name='login'),            # POST: login user, returns JWT + user
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # POST: refresh JWT
    path('profile/', UserProfileView.as_view(), name='profile'),  # GET: current logged-in user

    # ---------------------------
    # Web login (Django templates)
    # ---------------------------
    path('web/login/', custom_login_view, name='custom_login'),

    # ---------------------------
    # Role-based dashboards (web)
    # ---------------------------
    path('admin/dashboard/', admin_dashboard, name='admin_dashboard'),
    path('landlord/dashboard/', landlord_dashboard, name='landlord_dashboard'),
    path('tenant/dashboard/', tenant_dashboard, name='tenant_dashboard'),
    path('agent/dashboard/', agent_dashboard, name='agent_dashboard'),
    path('finance/dashboard/', finance_dashboard, name='finance_dashboard'),
    path('support/dashboard/', support_dashboard, name='support_dashboard'),
]
