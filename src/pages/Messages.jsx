import { FaSadCry } from "react-icons/fa"; 
import { IoMdClose } from "react-icons/io"; 
import { GiLoveLetter } from "react-icons/gi"; 
import { useDispatch, useSelector } from "react-redux";
import { database, updateMessege } from "../firebase/firebaseConfig";
import Modal from 'react-modal'
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { setMessages } from "../redux/appSlice";


Modal.setAppElement("#root")
function Messages() {
  let dispatch = useDispatch()
  let user = useSelector((data) => data.user.uid);
  let initialMessege = useSelector(data=>data.messages)
  let [messege, setMessege] = useState(initialMessege)
  let [modalMessage, setModalMessage] = useState('')
  const docRef = doc(database, 'Messeges', user)
  useEffect(()=>{
    onSnapshot(docRef, (snapshot)=>{
      const newMesseges = snapshot.data().messeges
      dispatch(setMessages(newMesseges))
      setMessege(newMesseges)
    })
  }, [])
  const unreadMessages = messege?.filter(values=>values.seen==false).length 

  const clickHandler = (n) => {
    updateMessege(n.time, user, messege);
    openModal()
    setModalMessage(n.messege)
  };

  function timeAgo(dateTimeString) {
    const now = new Date();
    const dateTimeParts = dateTimeString.split(' ');
    const timePart = dateTimeParts[0];
    const amPmPart = dateTimeParts[1];
    const datePart = dateTimeParts[2];
    
    // Combine date and time parts into a full datetime string
    const dateTime = new Date(`${datePart} ${timePart} ${amPmPart}`);
    
    // Calculate the difference in milliseconds
    const diff = now - dateTime;
    
    // Calculate difference in minutes, hours, and days
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  }
  
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (messege!=undefined)
    return (
      <section className="flex justify-center items-center w-full h-full">
        <ul className="flex flex-col-reverse max-w-[400px] w-[80%] gap-4 py-5">
          {messege.map((n) => (
            <li
              key={n.time}
              onClick={() => clickHandler(n)}
              className="cursor-pointer p-4 rounded-lg bg-white shadow-2xl text-black flex"
            >
              <div className={`${!n.seen && 'hidden'} flex justify-center items-center gap-3`}>
                <div className="p-2 border rounded-xl bg-slate-200">
                  <GiLoveLetter size={35} color="#fc6060" className="opacity-60"/>
                </div>
                <div className="flex-row">
                <h3>{n.messege}</h3>
                  <h4 className="text-sm text-gray-600">{timeAgo(n.time + ' ' + n.date)}</h4>
                </div>
              </div>
              <div className={`${n.seen && 'hidden'} flex items-center justify-center gap-3`}>
              <div className="p-3 border rounded-xl bg-red-200">
                  <GiLoveLetter size={35} color="red"/>
                </div>
                  <div className="flex-row">
                  <h3>New Message!</h3>
                  <h4 className="text-sm text-gray-600">{timeAgo(n.time + ' ' + n.date)}</h4>
                  </div>
              </div>
            </li>
          ))}
        </ul>

        <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={'m-0 bg-white h-full flex justify-center items-center'}
      >
        <button className="absolute m-4 right-0 top-0" onClick={closeModal}><IoMdClose size={25}/></button>
        <div className="rounded-3xl shadow-2xl overflow-hidden max-w-[400px] w-[90%] text-center">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-7">
            <h1 className="font-semibold text-white text-lg">shh! send me message anonymously</h1>
          </div>
          <h1 className="p-7 font-bold text-lg">{modalMessage}</h1>
        </div>
      </Modal>
    </div>
      </section>
    );
  return <h1 className="text-xl font-semibold flex justify-center items-center h-[80vh]">😔 there's no messege for you yet!</h1>;
}

export default Messages;
