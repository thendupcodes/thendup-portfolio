import { useNavigate } from 'react-router-dom';

export default function TileControls ({
  tilesToggled,
  hideControls,
  slowLoad,
  handleQuoteNext,
  handleQuotePrevious,
  toggleControls,
  toggleBackground,
  toggleFullScreen,
}) {
  const navigate = useNavigate();

  return (
    <div className={`Tiles__footer ${tilesToggled && !hideControls ? 'Tiles__footer--show' : ''} ${slowLoad ? 'Tiles__footer--slow-load' : ''}`}>
      <div
        tabIndex="0"
        role="button"
        className="Key Key--long Tiles__key-sc"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate("/")
        }}
        onClick={() => navigate("/")}
      >
        <div className="Key__icon Tiles__key-sc-icon"><i className="fa-solid fa-delete-left"></i></div>
        
        <span className="Key__info Tiles__key-sc-label">go&nbsp;home</span>
      </div>

      <div
        tabIndex="0"
        role="button"
        className="Key Tiles__key-sc"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleQuotePrevious()
        }}
        onClick={() => handleQuotePrevious()}
      >
        <div className="Key__icon Tiles__key-sc-icon"><i className="fa-solid fa-caret-left" /></div>
        
        <span className="Key__info Tiles__key-sc-label">previous</span>
      </div>

      <div
        tabIndex="0"
        role="button"
        className="Key Tiles__key-sc"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleQuoteNext()
        }}
        onClick={() => handleQuoteNext()}
      >
        <div className="Key__icon Tiles__key-sc-icon"><i className="fa-solid fa-caret-right" /></div>
        
        <span className="Key__info Tiles__key-sc-label">next</span>
      </div>

      <div
        tabIndex="0"
        role="button"
        className="Key Tiles__key-sc"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleBackground()
        }}
        onClick={() => toggleBackground()}
      >
        <div className="Key__icon Tiles__key-sc-icon"><i className="fa-solid fa-b"></i></div>
        
        <span className="Key__info Tiles__key-sc-label">background</span>
      </div>

      <div
        tabIndex="0"
        role="button"
        className="Key Tiles__key-sc"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleFullScreen()
        }}
        onClick={() => toggleFullScreen()}
      >
        <div className="Key__icon Tiles__key-sc-icon"><i className="fa-solid fa-f"></i></div>
        
        <span className="Key__info Tiles__key-sc-label">fullscreen</span>
      </div>

      <div
        tabIndex="0"
        role="button"
        className="Key Tiles__key-sc"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleControls()
        }}
        onClick={() => toggleControls()}
      >
        <div className="Key__icon Tiles__key-sc-icon"><i className="fa-solid fa-h"></i></div>
        
        <span className="Key__info Tiles__key-sc-label">hide</span>
      </div>
    </div>
  );
}