import React, { useState, useEffect } from 'react';
import './BrandBanner.style.css';

const BrandBanner = () => {
    const banners = [
        {
            images: ['/images/brandbanner1.png', '/images/brandbanner2.png'],
            title: 'ADIDAS',
            subtitle: 'SILENT BIRTHDAY IN THE SUBWAY',
            buttonText: '아디다스 스타일링'
        },
        {
            images: ['/images/brandbanner3.png', '/images/brandbanner4.png'],
            title: 'SAINT JAMES',
            subtitle: '24FW WINTER COLLECTION',
            buttonText: '세인트제임스의 겨울 에센셜 아이템'
        },
        {
            images: ['/images/brandbanner5.png', '/images/brandbanner6.png'],
            title: 'THE NORTHFACE',
            subtitle: 'NEW ARRIVAL NEW STYLE',
            buttonText: '24FW COLLECTION'
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === banners.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="brand-banner-container">
            <div className="brand-banner-slide">
                <div
                    className="brand-banner-image"
                    style={{
                        backgroundImage: `url(${banners[currentIndex].images[0]})`,
                    }}
                ></div>
                <div
                    className="brand-banner-image"
                    style={{
                        backgroundImage: `url(${banners[currentIndex].images[1]})`,
                    }}
                ></div>
                <div className="brand-banner-content">
                    <h2 className="brand-banner-title">{banners[currentIndex].title}</h2>
                    <p className="brand-banner-subtitle">{banners[currentIndex].subtitle}</p>
                    <button className="brand-banner-link-button">
                        {banners[currentIndex].buttonText}
                    </button>
                </div>
            </div>



            <div className="brand-banner-indicators">
                {banners.map((_, index) => (
                    <span
                        key={index}
                        className={`brand-banner-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default BrandBanner;