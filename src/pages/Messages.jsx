import React, { useEffect, useState } from "react";
import { auth, readMesseges } from "../firebase/firebaseConfig";

function Messages() {
  const uid = auth.currentUser.uid;
  console.log(uid);
  let [messege, setMessege] = useState(null);
  useEffect(() => {
    const data = readMesseges(uid);
    data.then((me) => {
      setMessege(me);
    });
  }, []);
  if (messege) return <section className="flex justify-center items-center w-full">
    <ul className="flex-row">
    {
        messege.reverse().map(n=><li className="p-4 rounded-lg bg-white m-5 shadow-2xl text-black flex justify-between gap-4">
          <h3>{n.messege}</h3>
          <div>
            <h4 className="text-sm text-gray-600">{n.time}</h4>
            <h4 className="text-xs text-center text-gray-600">{n.date}</h4>
          </div>
        </li>)
    }
    </ul>
  </section>;
  return <h1>there's no messege for you yet!</h1>;
}

export default Messages;
