import classNames from 'classnames';

export default function NodeBlock({
  policyholder,
  searchCode,
  searchPolicyholder,
  searchPolicyholderTop,
}) {
  const {
    code,
    name,
    registration_date: registrationDate,
    introducer_code: introducerCode,
  } = policyholder;

  return (
    <div className="node-block">
      <div
        className={classNames({
          'node': true,
          'node--root': code === searchCode,
          'node--direct': code !== searchCode && introducerCode === searchCode,
          'node--indirect': code !== searchCode && introducerCode !== searchCode,
        })}
        title={`保戶編號：${code}\n保戶姓名：${name}\n加入日：${registrationDate.substring(0, 10)}\n介紹人保戶編號：${introducerCode}`}
      >
        {code === searchCode ? (
          <>
            <strong>{code}</strong>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                searchPolicyholderTop(code);
              }}
              className="top-link"
            >
              <strong>↑上一階↑</strong>
            </a>
          </>
        ) : (
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              searchPolicyholder(code);
            }}
          >
            <strong>{code}</strong>
          </a>
        )}
        <br />
        {name}
      </div>
    </div>
  );
}
