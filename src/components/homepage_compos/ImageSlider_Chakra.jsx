import classes from "../JobSeeker/ImageHeader.module.css";
import { Box } from "@chakra-ui/react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// Settings for the slider
const settings = {
  dots: true,
  arrows: true,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <ChevronRightIcon color="white" strokeWidth={4} z={2} />,
  prevArrow: <ChevronLeftIcon color="white" strokeWidth={4} z={2} />,
  pauseOnHover: false,
};

export default function CaptionCarousel() {
  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: "1",
      header: (
        <h1 className="text-[1.8rem] font-[700] tracking-wider">
          Leading Tech Companies, including Google and Amazon, <br />
          Announce Massive Hiring Initiatives in 2023.
        </h1>
      ),
      tagline:
        "- Tech giants are gearing up for expansion, creating numerous job opportunities for skilled professionals.",
      image: "images/trust_hands_promise.jpg",
      top: "-37%",
      right: 0,
    },
    {
      title: "2",
      header: (
        <h1 className="text-[1.8rem] font-[700] tracking-wider">
          Remote Work Here to Stay:
          <br /> Survey Reveals 80% of Companies Embrace Flexible Work Models.
        </h1>
      ),
      tagline:
        "- The shift towards remote work continues, impacting job seekers' preferences and companies' hiring strategies.",
      image: "images/team_sitting_on_steps_dicussing.jpg",
      top: "-37%",
      right: 0,
    },
    {
      title: "3",
      header: (
        <h1 className="text-[1.8rem] font-[700] tracking-wider">
          Startups Flourish in 2023:
          <br />
          Emerges as a Hub for Innovation and New Job Opportunities.
        </h1>
      ),
      tagline:
        "- The startup scene is thriving, with emerging companies attracting both talent and investors.",
      image: "images/team_consultancy.jpg",
      top: "-37%",
      right: 0,
    },
    {
      title: "4",
      header: (
        <h1 className="text-[1.8rem] font-[700] tracking-wider">
          Companies Prioritize Diversity:
          <br />
          Zoho Sets New Standards in Inclusive Hiring Practices
        </h1>
      ),
      tagline:
        "- Diversity and inclusion take center stage as companies recognize the importance of a varied and equitable workforce.",
      image: "images/woman_with_laptop.jpg",
      top: "-37%",
      right: 0,
    },
    {
      title: "5",
      header: (
        <h1 className="text-[1.8rem] font-[700] tracking-wider">
          Tech Companies Revolutionize Hiring:
          <br />
          Media.net Introduces Gamified Interview Process
        </h1>
      ),
      tagline:
        "- Companies are adopting creative and innovative recruitment methods to attract top talent.",
      image: "images/group_discussing.jpg",
      top: "-37%",
      right: 0,
    },
  ];

  return (
    <Box
      position={"relative"}
      left={"0"}
      right={"0"}
      margin={"auto"}
      marginTop={"0rem"}
      width={"100vw"}
      height={"100vh"}
      overflow={"hidden"}
      backgroundPosition={"center"}
      border={"0px solid black"}
    >
      {/* Slider */}
      <Slider {...settings}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={"6xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
          >
            <div>
              <div className="w-full">
                <div className="bg-[#000000] w-full h-full relative">
                  <img
                    src={card.image}
                    alt="Contact Us"
                    className={classes.image}
                  />
                  <div
                    className={
                      "absolute top-[-10%] inset-0 flex flex-col gap-8 text-white items-center justify-center"
                    }
                  >
                    {card.header}
                    <div className="flex items-center gap-3 text-[1.3rem] w-[50%]">
                      {card.tagline}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
