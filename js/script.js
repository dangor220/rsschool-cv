$(document).ready(function () {
  // Smooth page loading

  $("body").addClass("smoothLoading");
  setTimeout(() => {
    $("body").removeClass("smoothLoading");
  }, 1600);

  // Initial slider

  $(".project__slider").slick({
    autoplay: true,
    dots: true,
  });

  // Smooth Scrool to anchor for all browser

  let scroll = new SmoothScroll('a[href*="#"]', {
    header: "[data-scroll-header]",
    speed: 1000,
    speedAsDuration: true,
  });

  // Animation when change scroll

  const header = document.querySelector(".header");
  const headerLogo = document.querySelector(".header__logo-link");
  const headerLink = document.querySelectorAll(".header__link");
  const skillItem = document.querySelectorAll(".skills__item ");
  const titleSkills = document.querySelector(".title__skills");
  const titleEducation = document.querySelector(".education__wrapper");
  const itemSection = document.querySelectorAll("main>div");
  const hamburgerLine = document.querySelectorAll(".header__line");
  const switchScroll = document.querySelectorAll(".header__switch-scroll");

  window.addEventListener("scroll", () => {
    // animation section

    animOnScroll(titleSkills, skillItem);
    animOnScroll(titleEducation);

    // animation navigation

    animChangeNavigation(itemSection, headerLink);
  });

  window.addEventListener("load", () => {
    if (
      window.pageYOffset >
      titleSkills.getBoundingClientRect().top -
        window.innerHeight -
        titleSkills.offsetHeight / 2
    ) {
      skillItem.forEach((item) => {
        item.classList.add("skills__item_show");
      });
    }

    // Add class active for navigation when reload page and pageYOffset > height nav

    if (
      window.pageYOffset >
      document.querySelector(".header").getBoundingClientRect().height
    ) {
      header.classList.add("header_active");
      headerLogo.classList.add("header__logo-link_active");
      headerLink.forEach((link) => {
        if (link.classList.contains("header__link-select")) {
          link.classList.add("header__link-select_active");
        }
        link.classList.add("header__link_active");
      });
      hamburgerLine.forEach((line) => {
        line.style.backgroundColor = "#000";
      });
      switchScroll.forEach((elem) => {
        if (elem.classList.contains("header__switch-lang_active")) {
          elem.classList.add("header__scroll_select");
        }
        elem.classList.add("header__scroll_active");
      });
    }
  });

  // Show hamburger

  const hamburger = document.querySelector(".header__hamburger");
  const hambNav = document.querySelector(".header__navigation");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");

    hambNav.classList.toggle("header__navigation_active");

    headerLink.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        hambNav.classList.remove("header__navigation_active");
      });
    });
  });

  // Show subtitle

  showSubtitle();
  setInterval(() => {
    showSubtitle();
  }, 8000);

  function showSubtitle() {
    const subLogo = document.querySelectorAll(".logo__subtitle");

    subLogo.forEach((subtitle, time) => {
      setTimeout(() => {
        subtitle.classList.add("logo__subtitle_show");
        setTimeout(() => {
          subtitle.classList.remove("logo__subtitle_show");
        }, 1800);
      }, 2700 * ++time);
    });
  }

  // Function anim nav

  function animChangeNavigation(elemSection, elemLink) {
    elemSection.forEach((section) => {
      const animItemHeight = section.offsetHeight;
      const animItemOffset =
        section.getBoundingClientRect().top + window.pageYOffset;
      const headerHeight =
        document.querySelector(".header").getBoundingClientRect().height +
        window.pageYOffset;

      // Get pageYOffset distance to unreachable section

      let scrollLastEl =
        window.pageYOffset +
        window.innerHeight -
        elemSection[elemSection.length - 1].getBoundingClientRect().height;
      const lastElPosition =
        elemSection[elemSection.length - 1].getBoundingClientRect().top +
        window.pageYOffset;

      if (
        (animItemOffset < headerHeight) &
          (headerHeight < animItemOffset + animItemHeight) ||
        scrollLastEl > lastElPosition
      ) {
        elemLink.forEach((item) => {
          header.classList.add("header_active");
          headerLogo.classList.add("header__logo-link_active");
          headerLink.forEach((link) => {
            if (link.classList.contains("header__link_select")) {
              link.classList.add("header__link-select_active");
            }
            link.classList.add("header__link_active");
          });
          hambNav.classList.add("header__navigation_active-scroll");
          hamburgerLine.forEach((line) => {
            line.style.backgroundColor = "#000";
          });

          switchScroll.forEach((elem) => {
            if (elem.classList.contains("header__switch-lang_active")) {
              elem.classList.add("header__scroll_select");
            }
            elem.classList.add("header__scroll_active");
          });

          if (section.id === item.hash.replace(/#/, "")) {
            item.classList.add("header__link-select_active");
          } else {
            item.classList.remove("header__link-select_active");
          }

          if (
            section.id === "home" &&
            window.pageYOffset <
              document.querySelector(".header").getBoundingClientRect().height
          ) {
            headerLink.forEach((link) => {
              link.classList.remove("header__link-select_active");
              link.classList.remove("header__link_active");
            });
            header.classList.remove("header_active");
            headerLogo.classList.remove("header__logo-link_active");
            hamburgerLine.forEach((line) => {
              line.style.backgroundColor = "#fff";
            });
            switchScroll.forEach((elem) => {
              if (elem.classList.contains("header__switch-lang_active")) {
                elem.classList.remove("header__scroll_select");
              }
              elem.classList.remove("header__scroll_active");
            });
          }

          if (
            section.id === "home" &&
            window.pageYOffset <
              document.querySelector(".header").getBoundingClientRect()
                .height &&
            window.innerWidth <= 767
          ) {
            header.classList.remove("header_active");
            headerLogo.classList.remove("header__logo-link_active");
            hambNav.classList.remove("header__navigation_active-scroll");
            hamburgerLine.forEach((line) => {
              line.style.backgroundColor = "#fff";
            });
          }
        });
      }
    });
  }

  // Function anim section

  function animOnScroll(elem, arrElems) {
    const animItemHeight = elem.offsetHeight;
    const animItemOffset =
      elem.getBoundingClientRect().top + window.pageYOffset;
    const animStart = 4;

    let animItemPoint = window.innerHeight - animItemHeight / animStart;

    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if (
      window.pageYOffset > animItemOffset - animItemPoint &&
      window.pageYOffset < animItemOffset + animItemHeight
    ) {
      if (elem.classList.contains("title__skills")) {
        arrElems.forEach((item) => {
          item.classList.add("skills__item_show");
        });
      }

      
      if (elem.classList.contains("education__wrapper")) {
        elem.classList.add("active");
      }

      if (elem.classList.contains('education__wrapper_count'))  {
        elem.classList.remove('education__wrapper_count');
        setTimeout(()=> {
          taskCounter(1, countTask, countTask.max, 50);
        }, 100);
      
        setTimeout(()=> {
          taskCounter(1, countRank, countRank.max, 200);
        }, 4000);
      }
    }
  }

  let countTask = document.querySelector('.counter__tasks');
  let countRank = document.querySelector('.counter__rank');

  function taskCounter(from, count, to, timer) {

    
    let current = from;

    let counter = setInterval(()=>{
      
      count.value = current;
      
      if (current == to) {
        clearInterval(counter);
      }
      current++;
      
    }, timer);
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAvLyBTbW9vdGggcGFnZSBsb2FkaW5nXHJcblxyXG4gICQoXCJib2R5XCIpLmFkZENsYXNzKFwic21vb3RoTG9hZGluZ1wiKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic21vb3RoTG9hZGluZ1wiKTtcclxuICB9LCAxNjAwKTtcclxuXHJcbiAgLy8gSW5pdGlhbCBzbGlkZXJcclxuXHJcbiAgJChcIi5wcm9qZWN0X19zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gIH0pO1xyXG5cclxuICAvLyBTbW9vdGggU2Nyb29sIHRvIGFuY2hvciBmb3IgYWxsIGJyb3dzZXJcclxuXHJcbiAgbGV0IHNjcm9sbCA9IG5ldyBTbW9vdGhTY3JvbGwoJ2FbaHJlZio9XCIjXCJdJywge1xyXG4gICAgaGVhZGVyOiBcIltkYXRhLXNjcm9sbC1oZWFkZXJdXCIsXHJcbiAgICBzcGVlZDogMTAwMCxcclxuICAgIHNwZWVkQXNEdXJhdGlvbjogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgLy8gQW5pbWF0aW9uIHdoZW4gY2hhbmdlIHNjcm9sbFxyXG5cclxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlclwiKTtcclxuICBjb25zdCBoZWFkZXJMb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2xvZ28tbGlua1wiKTtcclxuICBjb25zdCBoZWFkZXJMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5oZWFkZXJfX2xpbmtcIik7XHJcbiAgY29uc3Qgc2tpbGxJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbHNfX2l0ZW0gXCIpO1xyXG4gIGNvbnN0IHRpdGxlU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZV9fc2tpbGxzXCIpO1xyXG4gIGNvbnN0IHRpdGxlRWR1Y2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZHVjYXRpb25fX3dyYXBwZXJcIik7XHJcbiAgY29uc3QgaXRlbVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibWFpbj5kaXZcIik7XHJcbiAgY29uc3QgaGFtYnVyZ2VyTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaGVhZGVyX19saW5lXCIpO1xyXG4gIGNvbnN0IHN3aXRjaFNjcm9sbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaGVhZGVyX19zd2l0Y2gtc2Nyb2xsXCIpO1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAvLyBhbmltYXRpb24gc2VjdGlvblxyXG5cclxuICAgIGFuaW1PblNjcm9sbCh0aXRsZVNraWxscywgc2tpbGxJdGVtKTtcclxuICAgIGFuaW1PblNjcm9sbCh0aXRsZUVkdWNhdGlvbik7XHJcblxyXG4gICAgLy8gYW5pbWF0aW9uIG5hdmlnYXRpb25cclxuXHJcbiAgICBhbmltQ2hhbmdlTmF2aWdhdGlvbihpdGVtU2VjdGlvbiwgaGVhZGVyTGluayk7XHJcbiAgfSk7XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCA+XHJcbiAgICAgIHRpdGxlU2tpbGxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtXHJcbiAgICAgICAgd2luZG93LmlubmVySGVpZ2h0IC1cclxuICAgICAgICB0aXRsZVNraWxscy5vZmZzZXRIZWlnaHQgLyAyXHJcbiAgICApIHtcclxuICAgICAgc2tpbGxJdGVtLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJza2lsbHNfX2l0ZW1fc2hvd1wiKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGNsYXNzIGFjdGl2ZSBmb3IgbmF2aWdhdGlvbiB3aGVuIHJlbG9hZCBwYWdlIGFuZCBwYWdlWU9mZnNldCA+IGhlaWdodCBuYXZcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCA+XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxyXG4gICAgKSB7XHJcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyX2FjdGl2ZVwiKTtcclxuICAgICAgaGVhZGVyTG9nby5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyX19sb2dvLWxpbmtfYWN0aXZlXCIpO1xyXG4gICAgICBoZWFkZXJMaW5rLmZvckVhY2goKGxpbmspID0+IHtcclxuICAgICAgICBpZiAobGluay5jbGFzc0xpc3QuY29udGFpbnMoXCJoZWFkZXJfX2xpbmstc2VsZWN0XCIpKSB7XHJcbiAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJfX2xpbmstc2VsZWN0X2FjdGl2ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyX19saW5rX2FjdGl2ZVwiKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGhhbWJ1cmdlckxpbmUuZm9yRWFjaCgobGluZSkgPT4ge1xyXG4gICAgICAgIGxpbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMDAwXCI7XHJcbiAgICAgIH0pO1xyXG4gICAgICBzd2l0Y2hTY3JvbGwuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImhlYWRlcl9fc3dpdGNoLWxhbmdfYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJfX3Njcm9sbF9zZWxlY3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcImhlYWRlcl9fc2Nyb2xsX2FjdGl2ZVwiKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIFNob3cgaGFtYnVyZ2VyXHJcblxyXG4gIGNvbnN0IGhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyX19oYW1idXJnZXJcIik7XHJcbiAgY29uc3QgaGFtYk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyX19uYXZpZ2F0aW9uXCIpO1xyXG5cclxuICBoYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG5cclxuICAgIGhhbWJOYXYuY2xhc3NMaXN0LnRvZ2dsZShcImhlYWRlcl9fbmF2aWdhdGlvbl9hY3RpdmVcIik7XHJcblxyXG4gICAgaGVhZGVyTGluay5mb3JFYWNoKChsaW5rKSA9PiB7XHJcbiAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICBoYW1iTmF2LmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkZXJfX25hdmlnYXRpb25fYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICAvLyBTaG93IHN1YnRpdGxlXHJcblxyXG4gIHNob3dTdWJ0aXRsZSgpO1xyXG4gIHNldEludGVydmFsKCgpID0+IHtcclxuICAgIHNob3dTdWJ0aXRsZSgpO1xyXG4gIH0sIDgwMDApO1xyXG5cclxuICBmdW5jdGlvbiBzaG93U3VidGl0bGUoKSB7XHJcbiAgICBjb25zdCBzdWJMb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5sb2dvX19zdWJ0aXRsZVwiKTtcclxuXHJcbiAgICBzdWJMb2dvLmZvckVhY2goKHN1YnRpdGxlLCB0aW1lKSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHN1YnRpdGxlLmNsYXNzTGlzdC5hZGQoXCJsb2dvX19zdWJ0aXRsZV9zaG93XCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgc3VidGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcImxvZ29fX3N1YnRpdGxlX3Nob3dcIik7XHJcbiAgICAgICAgfSwgMTgwMCk7XHJcbiAgICAgIH0sIDI3MDAgKiArK3RpbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBGdW5jdGlvbiBhbmltIG5hdlxyXG5cclxuICBmdW5jdGlvbiBhbmltQ2hhbmdlTmF2aWdhdGlvbihlbGVtU2VjdGlvbiwgZWxlbUxpbmspIHtcclxuICAgIGVsZW1TZWN0aW9uLmZvckVhY2goKHNlY3Rpb24pID0+IHtcclxuICAgICAgY29uc3QgYW5pbUl0ZW1IZWlnaHQgPSBzZWN0aW9uLm9mZnNldEhlaWdodDtcclxuICAgICAgY29uc3QgYW5pbUl0ZW1PZmZzZXQgPVxyXG4gICAgICAgIHNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICBjb25zdCBoZWFkZXJIZWlnaHQgPVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArXHJcbiAgICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgICAgLy8gR2V0IHBhZ2VZT2Zmc2V0IGRpc3RhbmNlIHRvIHVucmVhY2hhYmxlIHNlY3Rpb25cclxuXHJcbiAgICAgIGxldCBzY3JvbGxMYXN0RWwgPVxyXG4gICAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCArXHJcbiAgICAgICAgd2luZG93LmlubmVySGVpZ2h0IC1cclxuICAgICAgICBlbGVtU2VjdGlvbltlbGVtU2VjdGlvbi5sZW5ndGggLSAxXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcbiAgICAgIGNvbnN0IGxhc3RFbFBvc2l0aW9uID1cclxuICAgICAgICBlbGVtU2VjdGlvbltlbGVtU2VjdGlvbi5sZW5ndGggLSAxXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgK1xyXG4gICAgICAgIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICAoYW5pbUl0ZW1PZmZzZXQgPCBoZWFkZXJIZWlnaHQpICZcclxuICAgICAgICAgIChoZWFkZXJIZWlnaHQgPCBhbmltSXRlbU9mZnNldCArIGFuaW1JdGVtSGVpZ2h0KSB8fFxyXG4gICAgICAgIHNjcm9sbExhc3RFbCA+IGxhc3RFbFBvc2l0aW9uXHJcbiAgICAgICkge1xyXG4gICAgICAgIGVsZW1MaW5rLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyX2FjdGl2ZVwiKTtcclxuICAgICAgICAgIGhlYWRlckxvZ28uY2xhc3NMaXN0LmFkZChcImhlYWRlcl9fbG9nby1saW5rX2FjdGl2ZVwiKTtcclxuICAgICAgICAgIGhlYWRlckxpbmsuZm9yRWFjaCgobGluaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobGluay5jbGFzc0xpc3QuY29udGFpbnMoXCJoZWFkZXJfX2xpbmtfc2VsZWN0XCIpKSB7XHJcbiAgICAgICAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyX19saW5rLXNlbGVjdF9hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyX19saW5rX2FjdGl2ZVwiKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaGFtYk5hdi5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyX19uYXZpZ2F0aW9uX2FjdGl2ZS1zY3JvbGxcIik7XHJcbiAgICAgICAgICBoYW1idXJnZXJMaW5lLmZvckVhY2goKGxpbmUpID0+IHtcclxuICAgICAgICAgICAgbGluZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDBcIjtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHN3aXRjaFNjcm9sbC5mb3JFYWNoKChlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImhlYWRlcl9fc3dpdGNoLWxhbmdfYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyX19zY3JvbGxfc2VsZWN0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcImhlYWRlcl9fc2Nyb2xsX2FjdGl2ZVwiKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChzZWN0aW9uLmlkID09PSBpdGVtLmhhc2gucmVwbGFjZSgvIy8sIFwiXCIpKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImhlYWRlcl9fbGluay1zZWxlY3RfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGVhZGVyX19saW5rLXNlbGVjdF9hY3RpdmVcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBzZWN0aW9uLmlkID09PSBcImhvbWVcIiAmJlxyXG4gICAgICAgICAgICB3aW5kb3cucGFnZVlPZmZzZXQgPFxyXG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGhlYWRlckxpbmsuZm9yRWFjaCgobGluaykgPT4ge1xyXG4gICAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlcl9fbGluay1zZWxlY3RfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlcl9fbGlua19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlcl9hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGhlYWRlckxvZ28uY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlcl9fbG9nby1saW5rX2FjdGl2ZVwiKTtcclxuICAgICAgICAgICAgaGFtYnVyZ2VyTGluZS5mb3JFYWNoKChsaW5lKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGluZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNmZmZcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN3aXRjaFNjcm9sbC5mb3JFYWNoKChlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGVhZGVyX19zd2l0Y2gtbGFuZ19hY3RpdmVcIikpIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlcl9fc2Nyb2xsX3NlbGVjdFwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGVhZGVyX19zY3JvbGxfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHNlY3Rpb24uaWQgPT09IFwiaG9tZVwiICYmXHJcbiAgICAgICAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCA8XHJcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJcIikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgICAgICAgIC5oZWlnaHQgJiZcclxuICAgICAgICAgICAgd2luZG93LmlubmVyV2lkdGggPD0gNzY3XHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkZXJfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBoZWFkZXJMb2dvLmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkZXJfX2xvZ28tbGlua19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGhhbWJOYXYuY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlcl9fbmF2aWdhdGlvbl9hY3RpdmUtc2Nyb2xsXCIpO1xyXG4gICAgICAgICAgICBoYW1idXJnZXJMaW5lLmZvckVhY2goKGxpbmUpID0+IHtcclxuICAgICAgICAgICAgICBsaW5lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmZlwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBGdW5jdGlvbiBhbmltIHNlY3Rpb25cclxuXHJcbiAgZnVuY3Rpb24gYW5pbU9uU2Nyb2xsKGVsZW0sIGFyckVsZW1zKSB7XHJcbiAgICBjb25zdCBhbmltSXRlbUhlaWdodCA9IGVsZW0ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3QgYW5pbUl0ZW1PZmZzZXQgPVxyXG4gICAgICBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIGNvbnN0IGFuaW1TdGFydCA9IDQ7XHJcblxyXG4gICAgbGV0IGFuaW1JdGVtUG9pbnQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBhbmltSXRlbUhlaWdodCAvIGFuaW1TdGFydDtcclxuXHJcbiAgICBpZiAoYW5pbUl0ZW1IZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgYW5pbUl0ZW1Qb2ludCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCAvIGFuaW1TdGFydDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCA+IGFuaW1JdGVtT2Zmc2V0IC0gYW5pbUl0ZW1Qb2ludCAmJlxyXG4gICAgICB3aW5kb3cucGFnZVlPZmZzZXQgPCBhbmltSXRlbU9mZnNldCArIGFuaW1JdGVtSGVpZ2h0XHJcbiAgICApIHtcclxuICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwidGl0bGVfX3NraWxsc1wiKSkge1xyXG4gICAgICAgIGFyckVsZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcInNraWxsc19faXRlbV9zaG93XCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBcclxuICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWR1Y2F0aW9uX193cmFwcGVyXCIpKSB7XHJcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2VkdWNhdGlvbl9fd3JhcHBlcl9jb3VudCcpKSAge1xyXG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZWR1Y2F0aW9uX193cmFwcGVyX2NvdW50Jyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcclxuICAgICAgICAgIHRhc2tDb3VudGVyKDEsIGNvdW50VGFzaywgY291bnRUYXNrLm1heCwgNTApO1xyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XHJcbiAgICAgICAgICB0YXNrQ291bnRlcigxLCBjb3VudFJhbmssIGNvdW50UmFuay5tYXgsIDIwMCk7XHJcbiAgICAgICAgfSwgNDAwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxldCBjb3VudFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRlcl9fdGFza3MnKTtcclxuICBsZXQgY291bnRSYW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZXJfX3JhbmsnKTtcclxuXHJcbiAgZnVuY3Rpb24gdGFza0NvdW50ZXIoZnJvbSwgY291bnQsIHRvLCB0aW1lcikge1xyXG5cclxuICAgIFxyXG4gICAgbGV0IGN1cnJlbnQgPSBmcm9tO1xyXG5cclxuICAgIGxldCBjb3VudGVyID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgXHJcbiAgICAgIGNvdW50LnZhbHVlID0gY3VycmVudDtcclxuICAgICAgXHJcbiAgICAgIGlmIChjdXJyZW50ID09IHRvKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGVyKTtcclxuICAgICAgfVxyXG4gICAgICBjdXJyZW50Kys7XHJcbiAgICAgIFxyXG4gICAgfSwgdGltZXIpO1xyXG4gIH1cclxuXHJcbn0pO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
