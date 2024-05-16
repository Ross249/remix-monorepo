import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, useLoaderData, useNavigation } from "@remix-run/react";
import { client } from "../lib/api";
import { useEffect, useRef } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Home" }, { name: "description", content: "To do list" }];
};

export async function loader() {
  const resp = await client.api.todos.$get();
  if (resp.ok) {
    const res = await resp.json();
    return json(res);
  }
  return null;
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const trasition = useNavigation();
  const inputRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (trasition.state === "loading") {
      inputRef.current?.reset();
    }
  }, [trasition.state]);

  const done = loaderData?.data.filter((todo) => todo.done);
  const undone = loaderData?.data.filter((todo) => !todo.done);
  return (
    <main className="bg-base-100 min-h-screen flex items-center justify-center">
      <div className="bg-base-50 flex flex-col md:flex-row rounded-2xl shadow-xl md:w-1/2 p-5  gap-8">
        <div className="block w-full md:w-1/2 h-full ">
          <div className="flex flex-col gap-2 w-full mb-2">
            <div className="text-lg uppercase font-bold text-center">
              to dos
            </div>
            <Form ref={inputRef} method="post" className="flex flex-row gap-2">
              <input
                name="title"
                type="text"
                className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
              ></input>
              <button className="w-10 h-10  border rounded-md">&#10011;</button>
            </Form>
          </div>
          <div>
            {
              // to do items
            }
            {undone?.map((todo) => (
              <div
                className="flex flex-row gap-2 justify-between items-center"
                key={todo.id}
              >
                <div
                  style={{ textDecoration: todo.done ? "line-through" : "" }}
                  className="text-lg"
                >
                  {todo.text}
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Form method="PUT" className="flex items-center">
                    <input hidden name="check" defaultValue={todo.id} />
                    <button className="border border-gray-300 rounded h-5 w-5 "></button>
                  </Form>
                  <Form method="DELETE" className="flex items-center">
                    <input hidden name="delete" defaultValue={todo.id} />
                    <button className="border-gray-300 rounded h-5 w-5">
                      &#10005;
                    </button>
                  </Form>
                </div>
              </div>
            ))}
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
            {done?.map((todo) => (
              <div
                className="flex flex-row gap-2 justify-between items-center"
                key={todo.id}
              >
                <div
                  style={{ textDecoration: todo.done ? "line-through" : "" }}
                  className="text-lg"
                >
                  {todo.text}
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Form method="put" className="flex items-center">
                    <input hidden name="check" defaultValue={todo.id} />
                    <button className="border-gray-300 rounded h-5 w-5">
                      &#10003;
                    </button>
                  </Form>
                  <Form method="delete" className="flex items-center">
                    <input hidden name="delete" defaultValue={todo.id} />
                    <button className="border-gray-300 rounded h-5 w-5">
                      &#10005;
                    </button>
                  </Form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "POST") {
    const data = new URLSearchParams(await request.text());
    const title = data.get("title") ?? "";
    const resp = await client.api["todos"].$post({
      json: {
        text: title,
      },
    });
    if (resp.ok) {
      data.set("title", "");
      const res = await resp.json();
      return res;
    }
  }
  if (request.method === "PUT") {
    const data = new URLSearchParams(await request.text());
    const id = data.get("check") ?? "";
    const resp = await client.api["todos"][":id{[0-9]+}"].$put({
      param: {
        id: id,
      },
    });

    if (resp.ok) {
      const res = await resp.json();
      return res;
    }
  }
  if (request.method === "DELETE") {
    const data = new URLSearchParams(await request.text());
    const id = data.get("delete") ?? "";
    const resp = await client.api["todos"][":id{[0-9]+}"].$delete({
      param: {
        id: id,
      },
    });

    if (resp.ok) {
      const res = await resp.json();
      return res;
    }
  }
  return null;
}
