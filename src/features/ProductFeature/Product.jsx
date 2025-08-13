import React, { useEffect, useState } from "react";
import item1 from "../../assets/images/item8.jpg";
import { Rate, Image, Card, Space, Typography, message } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductApi } from "../../api/mainAPi/productApi";
import LoadingSpinner from "../../components/Share/Loading";
const { Title, Text, Paragraph } = Typography;

const Product = ({ onProductData }) => {
  const { t } = useTranslation();

  // 1) Đảm bảo tên param khớp với Route: /product/:productId
  const { productId: rawId } = useParams();
  const productId = String(rawId ?? "").trim();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 2) Chỉ chạy query khi có id + chuẩn hoá shape về object sản phẩm
  const {
    data: product,
    isLoading: loading
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductApi(productId),
    enabled: productId.length > 0,
    // chuẩn hoá: nếu API trả {data: {...}} thì lấy .data, nếu trả {...} thì lấy luôn
    select: (res) => res?.data?.data ?? res?.data ?? res,
    onSuccess: (d) => console.log("✓ product loaded:", d),
    onError: (e) => console.log("✗ product error:", e),
    staleTime: 60_000,
  });

  // useEffect: chỉ chạy khi có product
  useEffect(() => {
    if (product && onProductData) {
      onProductData({
        ...product,
        category: {
          name: product.category_id?.name,
          slug: product.category_id?.name
            ? product.category_id.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
            : "",
        },
      });
    }
  }, [product, onProductData]);

  // Khi product hoặc variants thay đổi, mặc định chọn variant đầu tiên nếu chưa chọn
  useEffect(() => {
    if (product?.variants && product.variants.length > 0 && !selectedType) {
      setSelectedType(product.variants[0]._id);
    }
    // eslint-disable-next-line
  }, [productId, product?.variants]);

  // an toàn khi product chưa có
  const variants = product?.variants ?? [];
  const images = product?.images ?? [];
  const tags = product?.tags ?? [];

  // ...
  const selectedVariant =
    variants.find((v) => v._id === selectedType) || variants[0];

  const variantImages = images.filter(
    (img) => img.product_variant_id === selectedVariant?._id
  );

  // dùng optional chaining ở đây
  const displayImages =
    variantImages.length > 0
      ? variantImages
      : images.filter((img) => img.product_id === product?._id);

  const handleAddToCart = () => {
    message.success("Đã thêm vào giỏ hàng!");
  };
  const handleFavorite = () => {
    message.info("Đã thêm vào yêu thích!");
  };
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const handleSelectVariant = (variantId) => {
    setSelectedType(variantId);
    setSelectedImg(0);
  };

  if (loading) {
    return (
      <Card
        style={{
          minHeight: 400,
          borderRadius: 16,
          boxShadow: "0 2px 8px #f0f1f2",
          textAlign: "center",
        }}
      >
        <LoadingSpinner />
      </Card>
    );
  }

  if (!product || !product.name) {
    return (
      <Card
        style={{
          minHeight: 400,
          borderRadius: 16,
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      >
        {t("NoProductsFound")}
      </Card>
    );
  }

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 16, boxShadow: "0 2px 8px #f0f1f2" }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
        {/* Image Section */}
        <div
          style={{
            flex: "0 0 320px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={displayImages[selectedImg]?.media_id?.file_path || item1}
            alt={product.name}
            width={280}
            height={280}
            style={{
              borderRadius: 12,
              objectFit: "contain",
              background: "#fff",
              boxShadow: "0 1px 6px #eee",
            }}
            preview={true}
          />
          <Space style={{ marginTop: 12 }}>
            {displayImages.map((img, index) => (
              <Image
                key={index}
                src={img.media_id?.file_path || item1}
                alt="thumb"
                width={56}
                height={56}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 8,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedImg(index)}
                preview={false}
              />
            ))}
          </Space>
        </div>
        {/* Info Section */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            {product.name}
          </Title>
          <Space size={[16, 8]} wrap style={{ marginBottom: 8 }}>
            <Text>
              {t("Brand")}:{" "}
              <Text strong type="secondary" style={{ color: "#1677ff" }}>
                {product.brand_id?.name}
              </Text>
            </Text>
            <Text>
              {t('category')}:{" "}
              <Text strong style={{ color: "#fa8c16" }}>
                {product.category_id?.name}
              </Text>
            </Text>
            <Text>
              {t("Status")}:{" "}
              {selectedVariant?.stock_quantity > 0 ? (
                <span style={{ color: "#2ecc40" }}>{t("InStock")}</span>
              ) : (
                <span style={{ color: "#ff4d2d" }}>{t("OutOfStock")}</span>
              )}
            </Text>
          </Space>
          <div className="mb-2" style={{ fontSize: 15 }}>
            <span className="fw-bold">{t("Code")} SKU:</span>
            <span
              style={{
                color: "#e2a355",
                fontWeight: 600,
                background: "#fff7ea",
                padding: "4px 12px",
                borderRadius: 6,
                marginLeft: 8,
                fontFamily: "monospace",
                fontSize: 14,
              }}
            >
              {selectedVariant?.sku || "N/A"}
            </span>
          </div>
          <div className="mb-2">
            <span>
              <Rate allowHalf disabled value={5} style={{ color: "#faad14" }} />
              <Text style={{ marginLeft: 8, color: "#222" }}>
                {product.rating ? product.rating.toFixed(1) : "5"}
              </Text>
            </span>
          </div>
          <Paragraph style={{ color: "#444", marginBottom: 12 }}>
            {product.description}
          </Paragraph>
          {/* Type selection */}
          {variants && variants.length > 0 && (
            <div className="mb-2 text-[15px]">
              <span className="font-bold">{t('Type')}:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {variants.map((variant) => {
                  const isSelected = selectedType === variant._id;
                  return (
                    <button
                      key={variant._id}
                      onClick={() => handleSelectVariant(variant._id)}
                      className={`rounded-lg px-4 py-1.5 font-semibold transition-colors duration-200
              ${
                isSelected
                  ? "border-2 border-[#e2a355] bg-[#fff7ea] text-[#e2a355]"
                  : "border border-gray-300 bg-white text-[#e2a355]"
              }`}
                    >
                      {variant.attributes
                        .map((attr) => attr.attribute_value_id?.value)
                        .join(" / ")}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tag display */}
          {tags && tags.length > 0 && (
            <div className="mb-2">
              <span className="font-bold">{t("Tag")}:</span>
              {tags.map((tag) => (
                <span
                  key={tag._id}
                  className="inline-block bg-yellow-400 text-black rounded px-2 py-0.5 ml-2 text-sm"
                >
                  {tag.tag_id?.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-8 mb-6 flex-wrap">
            {/* Giá sản phẩm */}
            <span className="font-bold text-[32px] text-orange-500 min-w-[120px]">
              ${selectedVariant?.price || product.base_price}
            </span>

            {/* Quantity stepper */}
            <div className="flex items-center gap-2 bg-yellow-50 rounded-lg px-3 py-1 shadow-[0_1px_4px_#ffe58f]">
              <button
                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100 text-orange-500 font-bold disabled:opacity-50"
              >
                -
              </button>

              <span className="w-[60px] text-center">{quantity}</span>

              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100 text-orange-500 font-bold"
              >
                +
              </button>
            </div>

            {/* Nút mua hàng */}
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 rounded-lg min-w-[120px] font-semibold bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition"
            >
              <ShoppingCartOutlined /> {t("addToCart")}
            </button>

            {/* Nút chat */}
            <button className="flex items-center justify-center gap-2 rounded-lg min-w-[120px] font-semibold text-orange-500 border border-orange-500 bg-yellow-50 px-4 py-2 hover:bg-yellow-100 transition">
              <MessageOutlined /> {t("Message")}
            </button>
          </div>

          {/* Hàng dưới */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleFavorite}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 transition"
            >
              <HeartOutlined /> {t("AddWishlist")}
            </button>
            <span className="text-orange-500 font-bold flex items-center gap-1">
              <PhoneOutlined /> <b>{t("ProductContact")}</b>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Product;
