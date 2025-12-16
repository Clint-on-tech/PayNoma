from django.urls import path
from .views import PropertyListView, PropertyDetailView, UnitListView, TenantAssignmentView

urlpatterns = [
    # List and add properties (landlord)
    path('properties/', PropertyListView.as_view(), name='properties-list'),

    # Get property details
    path('properties/<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),

    # List units for a property
    path('units/', UnitListView.as_view(), name='units-list'),

    # Assign tenant to a unit
    path('units/assign/', TenantAssignmentView.as_view(), name='tenant-assign'),
]
