import "./styles.css";
import { useState } from "react";

const objPcOption = [
  { id: 1, item: "マウス" },
  { id: 2, item: "モニター" },
  { id: 3, item: "キーボード" }
];

const CheckBtnItems = ({ onChange, checked }) =>
  objPcOption.map((value) => {
    return (
      <label key={value.id}>
        <input
          type="checkbox"
          value={value.item}
          onChange={onChange}
          checked={checked[value.item]}
        />
        {value.item}
      </label>
    );
  });

const InputCheckBox = () => {
  /**
   * const array = [3,5,7];

const sum = array.reduce(
      // 第一引数:コールバック関数
    ( result      // ← 初期値・前回のreturn値
         , e      // ← 配列の値
    )=>{
        return result + e;
    }
      // 第二引数:初期値
    ,0 
 );
   */
  const [checkedPcOption, setCheckedPcOption] = useState(
    objPcOption.reduce((acc, cur) => {
      acc[cur.item] = false;
      return acc;
    }, {})
  );

  /**
   * チェックボックスチェンジイベント
   *
   */
  const onChangecheckedPcOption = (e) => {
    //同名プロパティが存在するオブジェクト内では後に書いた方でプロパティが上書きされる
    /**
     * const rect = {type: 'rectangle', width: 50, height: 20};
      const circle = {type: 'circle', radius: 25};
      const union = {...rect, ...circle};
      console.log(union);  // {width: 50, height: 20, type: "circle", radius: 25}
     */
    setCheckedPcOption({
      ...checkedPcOption,
      [e.target.value]: e.target.checked
    });
  };

  /**
   * 取り出したプロパティのvalueがtrueの場合 keyをpushして新しい配列を作成して再設定
   * Object.entriesオブジェクトをループ処理できるkey:valueでキーと値が取得出来る
   * IEでは使えない
   */
  const stateOfCheckedValues = Object.entries(checkedPcOption).reduce(
    (pre, [key, value]) => {
      // && は左側がtrueなら右側を返す
      value && pre.push(key);
      return pre;
    },
    []
  );

  return (
    <div className="App">
      <p>
        現在選択されている値：
        <b>{stateOfCheckedValues.join("、")}</b>
      </p>
      <CheckBtnItems
        onChange={onChangecheckedPcOption}
        checked={checkedPcOption}
      />
    </div>
  );
};

export default function App() {
  return <InputCheckBox />;
}
