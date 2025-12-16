from django.http import HttpResponseForbidden
from functools import wraps

def role_required(allowed_roles=None):
    if allowed_roles is None:
        allowed_roles = []

    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            user = request.user
            if not user.is_authenticated:
                return HttpResponseForbidden("You must be logged in to access this page.")
            if user.role not in allowed_roles:
                return HttpResponseForbidden("Access denied: You do not have permission to view this page.")
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator
