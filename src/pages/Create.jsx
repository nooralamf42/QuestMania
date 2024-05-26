import { FaDice } from "react-icons/fa"; 
import { useState } from "react";
import { auth, createMessege, database } from "../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import questions from "../data/data";

function Create() {
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const [text, setText] = useState('')
  const { username } = useParams();
  const diceHandler = () =>{
    const questionNumber = Math.floor(Math.random() * questions.length)
    const randomQuestion = questions[questionNumber]
    setText(randomQuestion)
  }
  const clickHandler = async () => {
    createMessege(message, username);
    navigate('/sent/' + username);
  };
  return (
    <Container>
      <div className="w-full max-w-[500px]  mx-auto py-10 relative">
        <div className="rounded-3xl overflow-hidden">
          <div className="bg-white flex items-center gap-4 p-3">
            <img
              className="rounded-full h-10 w-10"
              src="https://source.unsplash.com/500x600?cat"
              alt=""
              srcset=""
            />
            <div>
              <h2>username here</h2>
              <h2 className="font-semibold">send message anonymous!!</h2>
            </div>
          </div>
          <textarea
            type="text"
            value={text}
            onInput={(e) => setMessage(e.currentTarget.value)}
            className="p-2 focus:outline-none w-full text-xl bg-white bg-opacity-30 backdrop-blur-md"
            placeholder="type your question here"
          />
          <button className="absolute bottom-28 right-3 rounded-full bg-white bg-opacity-30 p-1 m-2"
          onClick={diceHandler}
          >
            <FaDice color="black" size={28}/>
          </button>
        </div>
        <button
          className="mt-5 text-white text-lg hover:scale-105 duration-200 hover:-rotate-3 bg-black py-2 rounded-2xl w-full"
          onClick={clickHandler}
        >
          Submit
        </button>
      </div>
    </Container>
  );
}

export default Create;
