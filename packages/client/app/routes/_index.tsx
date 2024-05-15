import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Home" }, { name: "description", content: "To do list" }];
};

export default function Index() {
  return (
    <main className="bg-base-100 min-h-screen flex items-center justify-center">
      <div className="bg-base-50 flex flex-col md:flex-row rounded-2xl shadow-xl md:w-1/2 p-5  gap-8">
        <div className="block w-full md:w-1/2 h-full ">
          <div className="flex flex-col gap-2 w-full mb-2">
            <div className="text-lg uppercase font-bold text-center">
              to dos
            </div>
            <Form method="post" className="flex flex-row gap-2">
              <input className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"></input>
              <button className="w-10 h-10  border rounded-md">&#10011;</button>
            </Form>
          </div>
          <div>
            {
              // to do items
            }
          </div>
        </div>

        <div className="block w-full md:w-1/2 h-full gap-2">
          <div className="flex flex-col  w-full">
            <div className="text-lg uppercase font-bold text-center">done</div>
          </div>
          <div>
            {
              // done items
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}
