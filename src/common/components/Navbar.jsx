import React, {useState} from 'react';
import {FiHeart, FiLogIn, FiUser, FiShoppingBag, FiSearch, FiChevronDown} from 'react-icons/fi';
import './Navbar.style.css';

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('WOMAN');

  const categories = {
    WOMAN: ['OUTERWEAR', 'TOP', 'BOTTOM', 'DRESS', 'ACCESSORIES'],
    MAN: ['OUTERWEAR', 'TOP', 'BOTTOM', 'ACCESSORIES'],
    BEAUTY: ['SKINCARE', 'MAKEUP', 'HAIR & BODY', 'DEVICES'],
    LIFE: ['HOME', 'TRAVEL', 'DIGITAL', 'CULTURE', 'FOOD']
  };

  const handleCategoryToggle = () => {
    if (isCategoryOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsCategoryOpen(false);
      }, 300);
    } else {
      setIsCategoryOpen(true);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='navbar-container'>
      <div className='navbar-top-section'>
        <div className='navbar-logo-container'>
          <img src='/images/logo.png' alt='logo' className='navbar-logo-image' />
        </div>
        <div className='navbar-search-bar'>
          <input type='text' placeholder='Search...' />
          <FiSearch />
        </div>
        <div className='navbar-icons'>
          <div className='navbar-icon-item'>
            <FiHeart /> LIKE
          </div>
          <div className='navbar-icon-item'>
            <FiLogIn /> LOGIN
          </div>
          <div className='navbar-icon-item'>
            <FiUser /> MY
          </div>
          <div className='navbar-icon-item'>
            <FiShoppingBag /> 0
          </div>
        </div>
      </div>

      <div className='navbar-bottom-section'>
        <div className='navbar-category-dropdown'>
          <button onClick={handleCategoryToggle} className='navbar-category-button'>
            CATEGORY <FiChevronDown className={`navbar-category-button-icon ${isCategoryOpen ? 'rotate' : ''}`} />
          </button>
          {(isCategoryOpen || isClosing) && (
            <div className={`navbar-category-menu ${isClosing ? 'closing' : ''}`}>
              <div className='navbar-category-list'>
                {Object.keys(categories).map((category) => (
                  <div
                    key={category}
                    className={`navbar-category-item ${selectedCategory === category ? 'navbar-active' : ''}`}
                    onClick={() => handleCategorySelect(category)}>
                    {category} {selectedCategory === category && <span className='navbar-arrow'>▶</span>}
                  </div>
                ))}
              </div>
              {selectedCategory && (
                <div className='navbar-subcategory-list'>
                  {categories[selectedCategory].map((subcategory) => (
                    <div key={subcategory} className='navbar-subcategory-item'>
                      {subcategory}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className='navbar-menu'>
          <div className='navbar-menu-item'>WOMEN</div>
          <div className='navbar-menu-item'>MEN</div>
          <div className='navbar-menu-item'>BEAUTY</div>
          <div className='navbar-menu-item'>LIFE</div>
          <div className='navbar-divider'></div>
          <div className='navbar-menu-item'>BEST</div>
          <div className='navbar-menu-item'>SALE</div>
          <div className='navbar-menu-item'>NEW</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
