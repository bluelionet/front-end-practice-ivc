/*
 * 產生隨機保戶編號：編號大於等於 min 且小於 max
 */
function createRandomCode(min, max) {
  return Math.floor(min + (max - min) * Math.random()).toString();
}

/*
 * 產生隨機較舊保戶編號
 */
function createRandomOlderCode(code) {
  return createRandomCode(1, parseInt(code, 10));
}

/*
 * 產生隨機較新保戶編號
 */
function createRandomNewerCode(code) {
  return createRandomCode(parseInt(code, 10) + 1, 10000);
}

/*
 * 產生保戶物件
 */
function createPolicyholderObject(code, introducerCode) {
  return {
    code,
    name: `保戶 ${code}`,
    registration_date: new Date(),
    introducer_code: introducerCode,
  };
}

/*
 * 產生左樹右樹物件
 */
function createSubtreesObject(code) {
  const newerCodes = [];
  for (let i = 0; i < 14; i += 1) {
    newerCodes.push(createRandomNewerCode(code));
  }
  newerCodes.sort((a, b) => {
    return parseInt(a, 10) - parseInt(b, 10);
  });

  const newerPolicyholders = newerCodes.map(newerCode => {
    const introducerCode = Math.random() > 0.5 ? code : createRandomOlderCode(newerCode);
    return createPolicyholderObject(newerCode, introducerCode);
  });

  return {
    l: [2, 4, 6, 8, 12, 10, 14].map(number => newerPolicyholders[number - 2]),
    r: [3, 5, 7, 9, 13, 11, 15].map(number => newerPolicyholders[number - 2]),
  };
}

/*
 * API Route Handler
 */
export default function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    // 保戶查詢：/api/policyholders?code={code}
    const { code } = req.query;
    res.status(200).json({
      ...createPolicyholderObject(code, createRandomOlderCode(code)),
      ...createSubtreesObject(code),
    });
  } else if (slug.length === 2 && slug[1] === 'top') {
    // 保戶上層查詢：/api/policyholders/{code}/top
    const code = slug[0];
    const introducerCode = createRandomOlderCode(code);
    res.status(200).json({
      ...createPolicyholderObject(introducerCode, createRandomOlderCode(introducerCode)),
      ...createSubtreesObject(introducerCode),
    });
  } else {
    res.status(404).json({
      code: '404',
      message: 'Error: No matching API.',
    });
  }
}
