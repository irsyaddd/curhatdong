import { log } from "console";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CurhatProps {
  id: string;
  value: string;
  timestamp: Date;
}

interface ListCurhatProps {
  Today: CurhatProps[];
}

export default function Home() {
  const [dataCurhat, setDataCurhat] = useState<ListCurhatProps>({ Today: [] });
  const [curhatan, setCurhatan] = useState("");

  const handleSubmit = useCallback(
    (text: string) => {
      const newCurhatan = {
        id: uuidv4(),
        value: text,
        timestamp: new Date(),
      };
      dataCurhat.Today = [...dataCurhat.Today, newCurhatan];
      localStorage.setItem("Curhat", JSON.stringify(dataCurhat));
      getItem();
    },
    [dataCurhat.Today, setDataCurhat]
  );

  const clearCurhat = useCallback(() => {
    localStorage.setItem("Curhat", JSON.stringify({ Today: [] }));
    getItem();
  }, []);

  const getItem = useCallback(() => {
    const listCurhat = JSON.parse(localStorage.getItem("Curhat")!);
    console.log(listCurhat);
    setDataCurhat(listCurhat);
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Curhat")!) !== null) {
      getItem();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Curhatdong</title>
        <meta
          name="description"
          content="A webpage to write and dump all your thought"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./thirteen.svg" />
      </Head>
      <main>
        <article>
          <p className="text-2xl font-bold">How was your day?</p>
          <textarea
            name="story"
            id="story"
            rows={1}
            placeholder="Type it here..."
            onChange={(e) => setCurhatan(e.target.value)}
            className="w-full h-auto overflow-y-hidden resize-none p-6 border border-gray-400 rounded-m mt-4"
          ></textarea>

          {dataCurhat.Today.map((item) => (
            <p key={item.id}>{item.value}</p>
          ))}

          <div className="flex flex-row gap-4 mt-4">
            <button
              onClick={() => handleSubmit(curhatan)}
              type="submit"
              className="bg-indigo-500 text-white px-6 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={clearCurhat}
              type="submit"
              className="border border-indigo-500 text-indigo-500 px-6 py-2 rounded-md"
            >
              Clear
            </button>
          </div>
        </article>
      </main>
    </>
  );
}
