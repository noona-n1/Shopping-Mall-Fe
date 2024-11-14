import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './BannerSlider.style.css';

const BannerSlider = () => {
    const banners = [
        { image: '/images/banner1.jpg', title: '스타일리시한 모던 감성', subtitle: '최대 30% 쿠폰 혜택' },
        { image: '/images/banner2.jpg', title: 'WEEK OF YOU', subtitle: '차원이 다른 역대급 세일' },
        { image: '/images/banner3.jpg', title: '오직 여기에서만 특가', subtitle: '~80%+20% 쿠폰' },
        { image: '/images/banner4.jpg', title: '귀여움이 묻어나는 계절', subtitle: '먼저 만나는 신상 20% 쿠폰' },
        { image: '/images/banner5.jpg', title: '11월 월간 뷰티', subtitle: '~88%+30% 쿠폰' },
        { image: '/images/banner6.jpg', title: '가장 인기있는 브랜드', subtitle: '최대 80% 쿠폰' },
        { image: '/images/banner7.jpg', title: '감각적인 스타일링', subtitle: '단독 ~80%+20% 쿠폰' },
        { image: '/images/banner8.jpg', title: '건강하게 가꾸는 뷰티', subtitle: '특별한 쿠폰 혜택 12%' },
        { image: '/images/banner9.jpg', title: '월드 와이드 샵', subtitle: '인기 글로벌 브랜드 최대 혜택' },
        { image: '/images/banner10.jpg', title: '클래식을 품은 가방', subtitle: '전 상품 20% 쿠폰' },
    ];

    const [centerIndex, setCenterIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const getVisibleSlides = () => {
        const slidesCount = banners.length;
        return [
            (centerIndex - 1 + slidesCount) % slidesCount,
            centerIndex,
            (centerIndex + 1) % slidesCount,
        ];
    };

    const nextSlide = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCenterIndex((prev) => (prev + 1) % banners.length);
        }
    }, [isTransitioning, banners.length]);

    const prevSlide = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCenterIndex((prev) => (prev - 1 + banners.length) % banners.length);
        }
    }, [isTransitioning, banners.length]);

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(autoSlide);
    }, [nextSlide]);

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
    };

    const getSlideStyle = (slideIndex, position) => {
        const isCenter = position === 1;

        const style = {
            backgroundImage: `url(${banners[slideIndex].image})`,
            transition: isTransitioning ? 'all 0.5s ease-in-out' : 'none',
        };

        if (window.innerWidth > 768) {
            style.opacity = isCenter ? 1 : 0.5;
        }

        if (window.innerWidth <= 768) {
            style.left = `${position * 100}%`;
            style.transform = 'none';
        } else if (window.innerWidth <= 1024) {
            style.left = `${position * 50}%`;
            style.transform = `scale(${isCenter ? 1.05 : 0.9})`;
        } else {
            style.left = `${position * 33.333}%`;
            style.transform = `scale(${isCenter ? 1.1 : 0.8})`;
        }

        return style;
    };

    const visibleSlides = getVisibleSlides();

    return (
        <section className="banner-section">
            <div className="banner-slider-wrapper">
                <div className="banner-slider-container">
                    {visibleSlides.map((slideIndex, position) => (
                        <div
                            key={slideIndex}
                            className={`banner-slide ${position === 1 ? 'banner-slide-active banner-slide-center' : ''}`}
                            style={getSlideStyle(slideIndex, position)}
                            onTransitionEnd={position === 1 ? handleTransitionEnd : undefined}
                        >
                            <div className="banner-slide-content">
                                <h2 className="banner-slide-title">{banners[slideIndex].title}</h2>
                                <p className="banner-slide-subtitle">{banners[slideIndex].subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="banner-navigation-button banner-button-left" onClick={prevSlide}>
                    <FiChevronLeft size={30} />
                </button>
                <button className="banner-navigation-button banner-button-right" onClick={nextSlide}>
                    <FiChevronRight size={30} />
                </button>
            </div>
        </section>
    );
};

export default BannerSlider;