import React from "react";
import Slider from "react-slick";

function LiveNewsSlider({ liveUrls }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay : true,
        autoplaySpeed: 2000,
        arrows : false
    };
    return (
        <>
            <section className="p-0 section news-slider-section">
                    <Slider {...settings}>
                        {liveUrls.map((live, index) =>
                            index > 0 && (
                                <div key={index} className="slider1">
                                    <iframe src={live?.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </div>
                            ))}
                    </Slider>
            </section>
        </>
    );
};

export default LiveNewsSlider;
