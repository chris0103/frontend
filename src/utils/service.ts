export default function getCurrent(server: string, items: string) {
  return new Promise((resolve, reject) => {
    let url = `http://${server}read?`;
    const ids = items.split('/');
    ids.forEach(id => {
      url = url.concat(`ids=${id}&`);
    });
    url = url.slice(0, url.length - 1);
    fetch(url, {
      cache: 'no-cache',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
      },
      method: 'GET',
      referrer: 'no-referrer',
    })
      .then(response => {
        response
          .json()
          .then(data => {
            const result = data.readResults;
            if (result) {
              resolve({
                status: result[0] && result[0].v,
                unit: result[1] && result[1].v,
                value: result[2] && result[2].v,
              });
            } else {
              reject();
            }
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
}
