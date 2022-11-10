import { useState, useEffect } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import "../../styles/components/scroll.css";

export default function Scroll() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <div className="top-to-btm">
      {isVisible && (
        <BiArrowFromBottom
          className="icon-position icon-style"
          onClick={scrollToTop}
        />
      )}
    </div>
  );
}
