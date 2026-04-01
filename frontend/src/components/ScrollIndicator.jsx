import React, { useState, useEffect, useRef } from 'react';

export function ScrollIndicator() {
  var progressState = useState(0);
  var progress = progressState[0];
  var setProgress = progressState[1];
  var draggingState = useState(false);
  var isDragging = draggingState[0];
  var setIsDragging = draggingState[1];
  var activeState = useState(false);
  var isActive = activeState[0];
  var setIsActive = activeState[1];
  var pastHeroState = useState(false);
  var pastHero = pastHeroState[0];
  var setPastHero = pastHeroState[1];
  var trackRef = useRef(null);
  var hideTimer = useRef(null);

  useEffect(function() {
    function showBar() {
      setIsActive(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(function() {
        if (!isDragging) setIsActive(false);
      }, 1800);
    }

    function onScroll() {
      var coursesEl = document.getElementById('courses');
      var startY = coursesEl ? coursesEl.offsetTop * 0.5 : 300;
      setPastHero(window.scrollY > startY);

      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setProgress(Math.max(0, Math.min(1, window.scrollY / docHeight)));

      showBar();
    }

    function onMouseMove(e) {
      if (e.clientX > window.innerWidth - 30) showBar();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return function() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(hideTimer.current);
    };
  }, [isDragging]);

  function scrollToRatio(clientY) {
    if (!trackRef.current) return;
    var rect = trackRef.current.getBoundingClientRect();
    var y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (y / rect.height) * docHeight });
  }

  function onMouseDown(e) {
    e.preventDefault();
    setIsDragging(true);
    setIsActive(true);
    scrollToRatio(e.clientY);
    function onMove(ev) { ev.preventDefault(); scrollToRatio(ev.clientY); }
    function onUp() { setIsDragging(false); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  function onTouchStart(e) {
    setIsDragging(true);
    setIsActive(true);
    scrollToRatio(e.touches[0].clientY);
    function onMove(ev) { ev.preventDefault(); scrollToRatio(ev.touches[0].clientY); }
    function onEnd() { setIsDragging(false); document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd); }
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  }

  if (!pastHero && !isDragging) return null;

  var showing = isActive || isDragging;

  return (
    <div
      ref={trackRef}
      className="fixed z-50 cursor-pointer"
      style={{
        right: '0px',
        top: '80px',
        bottom: '20px',
        width: '18px',
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderRadius: '100px 0 0 100px',
        border: 'none',
        transform: showing ? 'translateX(0)' : 'translateX(22px)',
        transition: 'transform 0.35s ease',
        pointerEvents: showing ? 'auto' : 'auto'
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onMouseEnter={function() { setIsActive(true); clearTimeout(hideTimer.current); }}
      onMouseLeave={function() { if (!isDragging) { hideTimer.current = setTimeout(function() { setIsActive(false); }, 800); } }}
    >
      <div
        style={{
          position: 'absolute',
          left: '3px',
          right: '3px',
          height: '36px',
          top: 'calc(' + (progress * 100) + '% - ' + (progress * 36) + 'px)',
          background: 'rgba(246,65,108,0.6)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: '100px',
          border: '1px solid rgba(246,65,108,0.35)',
          transition: isDragging ? 'none' : 'top 0.12s ease-out'
        }}
      />
    </div>
  );
}
