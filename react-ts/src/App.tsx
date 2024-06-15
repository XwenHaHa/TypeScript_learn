import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// 函数式组件类型
interface HomeProps {
  owner: string;
}

const Home: React.FC<HomeProps> = ({ owner }) => {
  return <>Home of {owner}</>;
};

function App() {
  // hooks中的类型参数
  const [list, setList] = useState<string[]>([]);
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setList(["1", "2", "3"]);
    console.log(domRef.current?.getBoundingClientRect());
  }, []);
  return (
    <>
      <div ref={domRef}>{list}</div>
      <Home owner="me"></Home>
    </>
  );
}

export default App;
