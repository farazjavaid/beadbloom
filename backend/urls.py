from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import EmailLoginView

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT Auth
    path('api/auth/login/', EmailLoginView.as_view(), name='login'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/', include('accounts.urls')),

    # App APIs
    path('api/products/', include('products.urls')),
    path("api/wishlist/", include("wishlist.urls")),
    path("api/cart/", include("cart.urls")),
    path("api/orders/", include("orders.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)