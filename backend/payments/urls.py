from django.urls import path
from .views import RentPaymentView, MpesaCallbackView

urlpatterns = [
    path('pay/', RentPaymentView.as_view(), name='rent_payment'),
    path('mpesa/callback/', MpesaCallbackView.as_view(), name='mpesa_callback'),
]
