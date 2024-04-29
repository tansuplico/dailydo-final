import React from "react";
import lock from "../../assets/lock.png";
import profile from "../../assets/profile.png";

const Form = ({
  handleRegister,
  setEmail,
  setPassword,
  setUsername,
  usernameError,
  username,
  emailError,
  email,
  passwordError,
  password,
}) => {
  return (
    <form
      className="w-full flex flex-col flex-center gap-5"
      onSubmit={(e) => {
        handleRegister(e);
      }}
    >
      <div
        className={`w-full px-2 flex flex-center bg-white rounded-2xl border-2 ${
          usernameError && "border-red-500"
        }`}
      >
        <img src={profile} alt="profile" className="w-[23px] h-[25px]" />
        <input
          type="text"
          placeholder="Username"
          className="w-full py-2 pl-2 focus:outline-none rounded-2xl"
          onChange={(e) => setUsername(e.currentTarget.value)}
          value={username}
        />
      </div>

      <div
        className={`w-full px-2 flex flex-center bg-white rounded-2xl border-2 ${
          emailError && "border-red-500"
        }`}
      >
        <img src={profile} alt="profile" className="w-[23px] h-[25px]" />
        <input
          type="email"
          placeholder="Email"
          className="w-full py-2 pl-2 focus:outline-none rounded-2xl"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div
        className={`w-full px-2 flex flex-center bg-white rounded-2xl border-2 ${
          passwordError && "border-red-500"
        }`}
      >
        <img src={lock} alt="lock" className="w-[23px] h-[25px]" />
        <input
          type="password"
          placeholder="Password"
          className="w-full py-2 pl-2 focus:outline-none rounded-2xl"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button
        className="w-full py-2 bg-[#DE3163] hover:bg-red-500 rounded-3xl cursor-pointer text-white transition-all"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
