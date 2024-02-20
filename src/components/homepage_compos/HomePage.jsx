import Testimonials from "./Testimonials";
import Slider from "./ImageSlider_Chakra";
import OurServices from "./OurServices";
import Roles from './Roles'

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Roles />
      <OurServices />
      <Testimonials />
    </div>
  );
};

export default HomePage;
