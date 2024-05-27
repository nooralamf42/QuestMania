import React from "react";

function Loading({visible}) {
  return (
    <div class={`${!visible && 'hidden'} absolute top-0 bottom-0 right-0 left-0`}>
      <div class="flex justify-center items-center space-x-1 text-black text-xl w-full h-full z-30 bg-white opacity-80">
        <svg
          fill="none"
          class="w-10 h-10 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fill-rule="evenodd"
          />
        </svg>

        <div>Loading ...</div>
      </div>
    </div>
  );
}

export default Loading;
