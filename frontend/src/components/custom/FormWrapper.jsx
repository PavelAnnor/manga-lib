export default function FormWrapper(props) {
  return (

    <div className="m-auto w-[70%] md:w-[40%]   border-2  border-[var(--primary-border)] flex flex-col ">
      <div className="w-full  bg-red-500 flex   ">
        <img
          src="./sauskeEyes.jpeg"
          className="w-[100%] h-[100%] border-b-2 border-[var(--primary-border-color)]"
        ></img>
      </div>
      {props.children}
    </div>
  );
}
