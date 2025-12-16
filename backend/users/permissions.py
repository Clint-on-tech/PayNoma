from rest_framework import permissions

class RolePermission(permissions.BasePermission):
    """
    Custom permission to allow only users with specific roles.
    Usage: permission_classes = [RolePermission]
           allowed_roles = ['admin', 'landlord']
    """

    allowed_roles = []

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        allowed_roles = getattr(view, 'allowed_roles', [])
        return request.user.role in allowed_roles
