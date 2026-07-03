from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductReview


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "image"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text", "is_main"]


class ProductReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = ProductReview
        fields = ["id", "username", "rating", "comment", "created_at"]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    final_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "category",
            "name",
            "slug",
            "sku",
            "short_description",
            "description",
            "price",
            "sale_price",
            "final_price",
            "stock",
            "weight",
            "badge",
            "featured",
            "active",
            "main_image",
            "images",
            "reviews",
            "created_at",
            "updated_at",
        ]

    def get_main_image(self, obj):
        main_image = obj.images.filter(is_main=True).first()
        if not main_image:
            main_image = obj.images.first()

        if main_image and main_image.image:
            request = self.context.get("request")
            image_url = main_image.image.url
            if request:
                return request.build_absolute_uri(image_url)
            return image_url

        return None