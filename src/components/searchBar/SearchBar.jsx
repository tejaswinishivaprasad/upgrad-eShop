import { useState } from 'react';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== '') {
      navigate(`/products?searchFor=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
	
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '4px' }}>
      <InputBase
        placeholder="Search…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginLeft: '8px', flex: 1 }}
      />
      <IconButton type="button" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
