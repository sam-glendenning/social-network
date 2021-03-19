import React, { useState, useEffect } from 'react';
import get from '../mockBackend/fetch';
import { NewsItem, Friend } from '../mockBackend/data';

function SocialNetwork() {
  const [menu, setMenu] = useState<string[]>([]);
  useEffect(() => {
    get('/menu').then((menuResponse: any) => {
      setMenu(menuResponse.data);
    });
  }, []);

  const [newsFeed, setNewsFeed] = useState<NewsItem[]>([]);
  useEffect(() => {
    get('/news-feed').then((newsFeedResponse: any) => {
      setNewsFeed(newsFeedResponse.data);
    });
  }, []);

  const [friends, setFriends] = useState<Friend[]>([]);
  useEffect(() => {
    get('/friends').then((friendsResponse : any) => {
      setFriends(friendsResponse.data);
    });
  }, []);
  
  return (
    <div className='SocialNetwork'>
      <h1>My Network</h1>
      {!menu ? <p>Loading..</p> : (
        <nav>
          {menu.map((menuItem) => (
            <button key={menuItem}>{menuItem}</button>
          ))}
        </nav>
      )}
      <div className='content'>
        {!newsFeed ? <p>Loading..</p> : (
          <section>
            {newsFeed.map(({ id, title, message, imgSrc }) => (
              <article key={id}>
                <h3>{title}</h3>
                <p>{message}</p>
                <img src={imgSrc} alt='' />
              </article>
            ))}
          </section>
        )}
        {!friends ? <p>Loading..</p> : (
          <aside>
            <ul>
              {friends
                .sort((a, b) => (a.isOnline && !b.isOnline ? -1 : 0))
                .map(({ id, name, isOnline }) => (
                  <li key={id} className={isOnline ? 'online' : 'offline'}>
                    {name}
                  </li>
                ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}

export default SocialNetwork;
