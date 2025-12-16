from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),

    # Accounts app (register, login, profile APIs)
    path('api/users/', include('users.urls')),  

    # Property app (properties & units)
    path('api/property/', include('property.urls')),

    # Payments app (rent payments + M-PESA)
    path('api/payments/', include('payments.urls')),

    # Optional root redirect to admin or docs
    path('', RedirectView.as_view(url='/admin/', permanent=False)),
]
