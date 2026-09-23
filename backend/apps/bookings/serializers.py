from rest_framework import serializers

from .models import Booking, BookingItem


class BookingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingItem
        fields = [
            "id",
            "item_type",
            "item_name",
            "quantity",
            "rate",
            "nights",
            "subtotal",
        ]


class BookingSerializer(serializers.ModelSerializer):
    items = BookingItemSerializer(many=True, read_only=True)
    nights = serializers.IntegerField(read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",
            "hotel",
            "room_type",
            "user",
            "guest_name",
            "guest_phone",
            "check_in",
            "check_out",
            "adults",
            "children",
            "total_amount",
            "currency",
            "status",
            "notes",
            "nights",
            "items",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["user", "nights", "items", "created_at", "updated_at"]

    def create(self, validated_data):
        booking = Booking.objects.create(**validated_data)
        BookingItem.objects.create(
            booking=booking,
            item_type="room",
            item_name=str(booking.room_type),
            quantity=1,
            rate=booking.room_type.base_price,
            nights=booking.nights,
            subtotal=booking.total_amount,
        )
        return booking
