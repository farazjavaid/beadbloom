from django.conf import settings
from django.db import models
from products.models import Product


class ShippingAddress(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="shipping_addresses"
    )
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=30)
    country = models.CharField(max_length=100, default="Finland")
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    street_address = models.CharField(max_length=255)
    apartment = models.CharField(max_length=100, blank=True)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.full_name} - {self.city}"


class Order(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("shipped", "Shipped"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    shipping_address = models.ForeignKey(
        ShippingAddress,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    order_number = models.CharField(max_length=30, unique=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=5.00)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.order_number


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True
    )
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def total_price(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"