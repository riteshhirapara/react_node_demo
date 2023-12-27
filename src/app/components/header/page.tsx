import { useRouter } from "next/navigation";
import AddCircle from "../common/add_circle";
import Logout from "../common/logout";

export default function Header() {
  const title = "My movies";
  const router = useRouter();

  return (
    <header className="bg-bgColor">
      <div className="h-[250px] flex items-center bg-bgColor w-[90%] mx-auto">
        <div className="flex gap-3 text-xl font-semibold leading-xl">
          <span className="self-center">{title}</span>
          <span className="self-center mt-0.5 cursor-pointer">
            <button
              onClick={() => {
                router.push("/movie/create");
              }}
            >
              <AddCircle size={32}></AddCircle>
            </button>
          </span>
        </div>
        <div className="flex gap-2 text-sm leading-base font-semibold ml-auto">
          <span className="self-center">Logout</span>
          <span
            className="cursor-pointer"
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            <Logout size={32}></Logout>
          </span>
        </div>
      </div>
    </header>
  );
}
