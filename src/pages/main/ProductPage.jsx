import React, { useCallback, useState } from "react";
import Product from "../../features/ProductFeature/Product";
import { useTranslation } from "react-i18next";
import { Breadcrumb, Space, Typography } from "antd";
import Review from "../../features/ProductFeature/Review";
const { Text } = Typography;

const ProductPage = () => {
  const { t } = useTranslation();
  const [productData, setProductData] = useState(null);

  // Sử dụng useCallback để tránh tạo function mới mỗi lần render
  const handleProductData = useCallback((data) => {
    setProductData(data);
  }, []);
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <span className="dark:text-white dark:hover:text-orange-400">
            {t("home")}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/shop">
          <span className="dark:text-white dark:hover:text-orange-400">
            {t("shop")}
          </span>
        </Breadcrumb.Item>
        {productData?.category && (
          <Breadcrumb.Item href={`/shop/${productData.category.slug}`}>
            <span className="dark:text-white dark:hover:text-orange-400">
              {productData.category.name}
            </span>
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item>
          <span style={{ color: "#fa8c16", fontWeight: 600 }}>
            {productData?.name}
          </span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Product onProductData={handleProductData} />
      <div
        style={{ display: "flex", flexWrap: "wrap", marginTop: 40, gap: 32 }}
      >
        <div style={{ flex: 1, minWidth: 320 }}>
          <Review />
        </div>
        <div
          style={{
            flex: "0 0 280px",
            background: "#fff7e6",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 6px #eee",
            marginTop: 24,
            height: "fit-content",
          }}
        >
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Text strong style={{ color: "#fa8c16" }}>
              🚚 Giao hàng nhanh chóng
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Nội thành Hoá tốc 30 phút
            </Text>
            <Text strong style={{ color: "#fa8c16" }}>
              ✅ Sản phẩm chính hãng
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Sản phẩm nhập khẩu 100%
            </Text>
            <Text strong style={{ color: "#fa8c16" }}>
              🔄 Đổi trả cực kì dễ dàng
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Đổi trả trong 5 ngày đầu tiên
            </Text>
            <Text strong style={{ color: "#fa8c16" }}>
              💰 Mua hàng tiết kiệm
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Giá tốt nhất thị trường
            </Text>
            <Text strong style={{ color: "#fa8c16" }}>
              📞 Hotline mua hàng:
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              0949111520
            </Text>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
