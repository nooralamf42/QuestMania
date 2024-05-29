import React, { Children, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../src/index.css";
import step1 from "../data/step0.gif";
import step2 from "../data/step1.gif";
import step3 from "../data/step2.gif";
import step4 from "../data/step3.gif";
import step5 from "../data/step4.gif";


// import required modules
import { Pagination } from "swiper/modules";
import { IoMdClose } from "react-icons/io";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Container from "./Container";
import story from "../data/story.jpg";
import Modal from "react-modal";

function CreateLink() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  const location = useLocation();
  let [modalMessage, setModalMessage] = useState("");
  console.log(location.pathname);
  const uid = auth.currentUser.uid;
  let url = window.location.href;
  url = url.includes(".com")
    ? url.replace("https:", "").split(".com")[0] + ".com/user/"
    : url.split("/")[0] + url.split("/")[2] + "/user/";
  function clickHandlder() {
    navigator.clipboard.writeText(url + uid);
    toast.success("Copied to clipboard");
  }

  const modalHandlder = () => {
    openModal();
    setModalMessage("helo");
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const storyHandler = async () => {
    let url = story
    let title = "story.jpg"
    const response = await fetch(url.toString());
    const blob = await response.blob();

    const filesArray = [new File([blob], title, { type: blob.type })];
    const shareData = {
      title: title,
      files: filesArray,
      text: "test",
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    }
  };

  return (
    <Container className={"flex items-center flex-col justify-center"}>
      <div className="rounded-3xl shadow-2xl mt-20 mb-10 p-4 max-w-[450px] w-[85%] bg-white">
        <h1 className="text-lg sm:text-2xl font-bold my-2">
          Step 1 : Copy your link
        </h1>
        <h2 className="w-[60%] mx-auto mb-2 truncate text-gray-600 font-semibold">
          {url + uid}
        </h2>
        <button
          className="rounded-full my-3 text-xl px-4 py-2 bg-black text-white hover:bg-gray-800"
          onClick={clickHandlder}
        >
          Click here to copy
        </button>
      </div>

      <div className="rounded-3xl shadow-2xl mb-8 p-4 max-w-[450px] w-[85%] bg-white">
        <h1 className="text-lg sm:text-2xl font-bold my-2">
          Step 2 : Share link on story
        </h1>

        <button
          className="rounded-full my-3 w-full px-4 py-2 bg-gradient-to-tr shadow-md from-pink-400 to-violet-400 hover:scale-105 text-white text-lg font-semibold hover:bg-gray-800"
          onClick={modalHandlder}
        >
          Share!
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={'h-full w-full mx-auto bg-white flex justify-center items-center'}
      >
        <div className="rounded-3xl w-[90%] max-w-[450px] shadow-2xl overflow-hidden text-center p-4">
        <button className="absolute m-4 z-20 right-0 top-0" onClick={closeModal}>
          <IoMdClose size={35} />
        </button>
        
       
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="p-2 w-full overflow-hidden pb-20">
              <h1 className="text-2xl font-bold my-5">How to add link in story</h1>
              <img className="rounded-2xl" src={step1} alt="" srcset="" />
              <h2 className="text-2xl font-semibold mt-5">Click on stories</h2>
              <h2 className="text-3xl font-bold mt-2">Swipe for next step</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-2 w-full overflow-hidden">
              <h1 className="text-2xl font-bold my-5">How to add link in story</h1>
              <img className="rounded-2xl" src={step2} alt="" srcset="" />
              <h2 className="text-2xl font-semibold mt-5">Click on sticker button</h2>
              <h2 className="text-3xl font-bold mt-2">Swipe for next step</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-2 w-full overflow-hidden">
              <h1 className="text-2xl font-bold my-5">How to add link in story</h1>
              <img className="rounded-2xl" src={step3} alt="" srcset="" />
              <h2 className="text-2xl font-semibold mt-5">Click LINK sticker</h2>
              <h2 className="text-3xl font-bold mt-2">Swipe for next step</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-2 w-full  overflow-hidden">
              <h1 className="text-2xl font-bold my-5">How to add link in story</h1>
              <img className="rounded-2xl" src={step4} alt="" srcset="" />
              <h2 className="text-2xl font-semibold mt-5">Paste your link</h2>
              <h2 className="text-3xl font-bold mt-2">Swipe for next step</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-2 w-full  overflow-hidden">
              <h1 className="text-2xl font-bold my-5">How to add link in story</h1>
              <img className="rounded-2xl" src={step5} alt="" srcset="" />
              <h2 className="text-2xl font-semibold mt-5">Set link in your story</h2>
              <button
          className="rounded-full mt-4 px-4 py-2 w-full font-semibold text-2xl bg-black text-white hover:bg-gray-800"
          onClick={storyHandler}
        >
          Share on Instagram
        </button>
            </div>
          </SwiperSlide>
         </Swiper>
         </div>
      </Modal>
    </Container>
  );
}

export default CreateLink;
