import React from 'react';
import BannerSlider from "./components/BannerSlider/BannerSlider";
import RecommendedProducts from "./components/RecommendedProducts/RecommendedProducts"
import BrandBanner from "./components/BrandBanner/BrandBanner";
import CategorySection from "./components/CategorySection/CategorySection";
import './HomePage.style.css';

const HomePage = () => {

  const baseProduct = {
    id: 1,
    image: '/images/banner8.jpg',
    brand: 'LOOKAST',
    title: 'LEANNE WOOL HANDMADE HALF COAT',
    price: 143663,
    originalPrice: 298000,
    discount: 51,
  };

  const recommendedProducts = Array.from({ length: 18 }, (_, index) => ({
    ...baseProduct,
    id: index + 1,
  }));

  const categories = [
    {
      name: "WOMEN",
      products: Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        image: '/images/banner2.jpg',
        title: 'MIND BRIDGE Women',
        price: 199000,
        originalPrice: 399000,
        discount: 50,
        badge: '특가',
      })),
    },
    {
      name: "MEN",
      products: Array.from({ length: 10 }, (_, index) => ({
        id: index + 11, // ID가 중복되지 않도록 오프셋 추가
        image: '/images/banner3.jpg',
        title: 'ADER ERROR',
        price: 698000,
        originalPrice: null,
        discount: null,
      })),
    },
    {
      name: "BEAUTY",
      products: Array.from({ length: 10 }, (_, index) => ({
        id: index + 21,
        image: '/images/banner5.jpg',
        title: 'JAVIN DE SEOUL',
        price: 18827,
        originalPrice: 28000,
        discount: 32,
        badge: '쿠폰',
      })),
    },
    {
      name: "LIFE",
      products: Array.from({ length: 10 }, (_, index) => ({
        id: index + 31,
        image: '/images/banner6.jpg',
        title: 'Life Product',
        price: 32000,
        originalPrice: null,
        discount: null,
      })),
    },
  ];

  // 브랜드배너 데이터
  const brandBanners = [
    {
      image: '/images/brand1.jpg',
      title: 'SAINT JAMES',
      subtitle: '24FW WINTER COLLECTION',
      buttonText: '컬렉션 보러가기',
    },
    {
      image: '/images/brand2.jpg',
      title: 'ADIDAS',
      subtitle: 'LIMITED EDITION',
      buttonText: '상품 확인하기',
    },
  ];


  return (
    <div className="homepage-container">
      {/* 배너 슬라이더 */}
      <BannerSlider />

      {/* 배너 스트립 */}
      <div className="banner-strip-container">
        <a href="/shopping-reward" className="banner-half">
          <div className="banner-text">
            <h3 className="banner-title">SHOPPING REWARD</h3>
            <p className="banner-subtitle">구매할수록 커지는 혜택</p>
          </div>
          <img
            src="/images/banner-strip1.jpg"
            alt="쇼핑 리워드"
            className="banner-image"
          />
        </a>
        <a href="/welcome" className="banner-half">
          <div className="banner-text">
            <h3 className="banner-title">WELCOME OF YOU</h3>
            <p className="banner-subtitle">신규회원 스페셜 혜택 가이드</p>
          </div>
          <img
            src="/images/banner-strip2.jpg"
            alt="웰컴 혜택"
            className="banner-image"
          />
        </a>
      </div>

      {/* 추천 상품 */}
      <RecommendedProducts products={recommendedProducts} />

      {/* 브랜드배너 */}
      <BrandBanner banners={brandBanners} />


      {/* 카테고리별 추천 상품 */}
      {categories.map((category) => (
        <CategorySection
          key={category.name}
          categoryName={category.name}
          products={category.products}
        />
      ))}
    </div>
  );
};

export default HomePage;