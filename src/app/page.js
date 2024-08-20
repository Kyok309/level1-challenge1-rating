"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {

  const [submitted, setSubmitted] = useState(false);
  const [rate, setRate] = useState(null);
  const [message, setMessage] = useState("");
  const buttonsRef = useRef(null);

  const onSubmit = () => {
    if (rate === null) {
      setMessage("Оноогоо сонгоно уу.");
    } else {
      setSubmitted(true);
    }
  };

  const handleClickOutside = (event) => {
    if (buttonsRef.current && !buttonsRef.current.contains(event.target)) {
      setRate(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const rateButton = () => {
    const buttons = [];
    for (let i = 1; i <= 5; i++) {
      buttons.push(
        <button
          key={i}
          className="bg-[#294375] w-14 h-14 rounded-full border-white border-2 focus:bg-white focus:text-[#294375] hover:bg-white hover:text-[#294375] hover:border-[#7A58F4] mobile:w-12 mobile:h-12"
          onClick={(e) => {
            e.stopPropagation();
            setRate(i);
            setMessage("");
          }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  if(!submitted) {
    return (
      <main className="bg-[#041740] min-h-screen flex justify-center items-center">
        <div className="bg-[#162D68] w-1/4 min-w-[400px] flex flex-col justify-center items-center gap-8 p-8 rounded-2xl text-white mobile:min-w-full">
          <div className="w-full flex flex-col gap-4">
            <div className="text-xl font-semibold">
              Та манай системд хэр сэтгэл хангалуун байна вэ?
            </div>
            <div className="text-[15px] text-gray-200">
              Бидний гүйцэтгэлийг үнэлнэ үү! Хэрэглэгчийн үнэлгээ болон шүүмж нь биднийг өсөн дэвжихэд тус болдог.
            </div>
          </div>

          <div className="w-full flex justify-between items-center text-lg text-white">
              {rateButton()}
            </div>

          <div className="w-full flex flex-col gap-4" ref={buttonsRef}>
            {message ? (<div className="text-red-600">{message}</div>) : (null)}
            <button className="bg-[#7A58F4] w-full py-2 rounded-2xl text-lg text-white hover:bg-[#583db9] hover:text-gray-300" onClick={onSubmit}>
              Илгээх
            </button>
          </div>
        </div>
      </main>
    );
  }
  else if(submitted){
    return (
      <main className="bg-[#041740] min-h-screen flex justify-center items-center">
        <div className="bg-[#162D68] w-1/4 min-w-[400px] flex flex-col justify-center items-center p-8 rounded-2xl text-white mobile:min-w-full">
          <div className="mb-2 text-2xl font-semibold">
            Баярлалаа!
          </div>
          <div className="mb-4 text-sm text-gray-200">
            Таны санал хүсэлтэд үргэлж нээлттэй.
          </div>
          <Image src="/feedback.png" width={200} height={200} alt="feedback"/>
        </div>
      </main>
    );
  }
}
