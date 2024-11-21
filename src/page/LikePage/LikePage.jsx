import {useEffect, useMemo, useState} from 'react';
import ProductCard from '../../common/components/ProductCard/ProductCard';
import './LikePage.style.css';
import {useDispatch, useSelector} from 'react-redux';
import {getLikeList} from '../../features/like/likeSlice';

const LikePage = () => {
  const dispatch = useDispatch();
  const {likes, loading, error} = useSelector((state) => state.like);

  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState('All');
  const [viewType, setViewType] = useState('grid'); // 현재는 미사용 상태, 필요 시 추가 구현 가능

  // 좋아요 리스트 가져오기
  useEffect(() => {
    dispatch(getLikeList()); // 좋아요 리스트 호출
  }, [dispatch]);

  const filteredLikes = useMemo(() => {
    return likes
      .filter((like) => like.productId) // productId가 존재하는 항목만 유지
      .filter((like) => like.productId._id && like.productId.image); // 추가 검증
  }, [likes, activeTab]);
  // 로딩 또는 에러 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='like-page'>
      <div className='like-page-header'>
        <h1 className='like-page-title'>MY♡ITEM ({filteredLikes.length})</h1>
        <div className='like-page-tabs'>
          <div className={`tab-button ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>
            All
          </div>
          <div className={`tab-button ${activeTab === 'WOMEN' ? 'active' : ''}`} onClick={() => setActiveTab('WOMEN')}>
            WOMEN
          </div>
          <div className={`tab-button ${activeTab === 'MEN' ? 'active' : ''}`} onClick={() => setActiveTab('MEN')}>
            MEN
          </div>
          <div className={`tab-button ${activeTab === 'LIFE' ? 'active' : ''}`} onClick={() => setActiveTab('LIFE')}>
            LIFE
          </div>
          <div
            className={`tab-button ${activeTab === 'BEAUTY' ? 'active' : ''}`}
            onClick={() => setActiveTab('BEAUTY')}>
            BEAUTY
          </div>
        </div>
      </div>

      <div className={`products-container ${viewType}`}>
        {filteredLikes.length > 0 ? (
          filteredLikes.map((like) => (
            <ProductCard
              key={like.productId._id}
              id={like.productId._id}
              image={like.productId.image}
              title={like.productId.name}
              salePrice={like.productId.salePrice}
              originalPrice={like.productId.price}
              discountRate={like.productId.saleRate}
            />
          ))
        ) : (
          <div className='empty-message'>No items found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default LikePage;
