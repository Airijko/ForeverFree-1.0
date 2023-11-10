'use client';

import { useState, useEffect } from 'react';

import Card from '../Card';
import Link from 'next/link';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((organization) => (
        <Card
          key={organization._id}
          organization={organization}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const ListOrganizations = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/organization/');
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterSearch = (search) => {
    const regex = new RegExp(search, 'i');
    return posts.filter(
      (item) =>
        regex.test(item.owner.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const newValue = e.target.value;
    setSearchText(newValue);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterSearch(newValue);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (e) => {
    setSearchText(e);

    const search = filterSearch(e);
    setSearchResults(search);
  };

  return (
    <section className="feed">
      <h1 className="font-satoshi text-5xl font-bold">CHURCHES</h1>
      <br />
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <Link href="/organization/register" className="white_nav_btn">
        Register Organization
      </Link>

      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default ListOrganizations;
