'use client';

import { useState, useEffect } from 'react';
import Card from '../Card';
import Link from 'next/link';

const CommunitiesCardList = ({ data, handleTagClick }) => (
  <div className="mt-6 prompt_layout">
    {data.map((organization) => (
      <Card
        key={organization._id}
        organization={organization}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>
);

const ListCommunities = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/community/');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterSearch = (search) => {
    const regex = new RegExp(search, 'i');
    return posts.filter(
      (item) => regex.test(item.owner.username) || regex.test(item.name)
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

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const search = filterSearch(tag);
    setSearchResults(search);
  };

  return (
    <section className="feed">
      {/* Search Input */}
      <form className="relative w-full flex-center mb-4">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      {/* Register Button */}
      <div className="flex justify-end w-full mb-6">
        <Link href="/communities/register" className="btn btn-outline">
          Register Organization
        </Link>
      </div>

      {/* Card List */}
      <CommunitiesCardList
        data={searchText ? searchResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default ListCommunities;
