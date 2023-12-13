import { useRef, useState } from 'react';
import NodeBlock from './NodeBlock.js';

export default function PolicyholderSearcher() {
  const inputRef = useRef(undefined);
  const [searchCode, setSearchCode] = useState(undefined);
  const [reslut, setResult] = useState(undefined);

  // 保戶查詢函式
  async function searchPolicyholder(code) {
    try {
      const response = await fetch(`/api/policyholders?code=${encodeURIComponent(code)}`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const json = await response.json();
      console.log(`保戶 ${code} 查詢結果`);
      console.log(json);

      setSearchCode(code);
      setResult(json);
    } catch (e) {
      console.error(e);
    }
  }

  // 保戶上層查詢函式
  async function searchPolicyholderTop(code) {
    try {
      const response = await fetch(`/api/policyholders/${encodeURIComponent(code)}/top`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const json = await response.json();
      console.log(`保戶 ${code} 上層查詢結果`);
      console.log(json);

      setSearchCode(json.code);
      setResult(json);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h1>保戶關係查詢</h1>

      <div>
        <label>保戶編號</label>
        {' '}
        <input type="text" ref={inputRef} />
        {' '}
        <button
          type="button"
          onClick={() => {
            const code = inputRef.current.value;
            searchPolicyholder(code);
          }}
        >
          查詢
        </button>
      </div>

      {reslut && (
        <>
          <div>關係圖</div>
          <div className="tree">
            <div className="tree__root">
              <NodeBlock
                policyholder={reslut}
                searchCode={searchCode}
                searchPolicyholderTop={searchPolicyholderTop}
              />
            </div>
            <div className="tree__subtree">
              {reslut.l.map((policyholder, index) => (
                <NodeBlock
                  key={index}
                  policyholder={policyholder}
                  searchCode={searchCode}
                  searchPolicyholder={searchPolicyholder}
                />
              ))}
            </div>
            <div className="tree__subtree">
              {reslut.r.map((policyholder, index) => (
                <NodeBlock
                  key={index}
                  policyholder={policyholder}
                  searchCode={searchCode}
                  searchPolicyholder={searchPolicyholder}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
