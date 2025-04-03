"use client";

import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function LandingPage() {
  useEffect(() => {
    // Scroll event for header and back-to-top button
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 50 && header) {
        header.classList.add("header-scrolled");
      } else if (header) {
        header.classList.remove("header-scrolled");
      }
      const btn = document.getElementById("backToTop");
      if (btn) {
        btn.style.display = window.scrollY > 500 ? "block" : "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Smooth scroll function
    function smoothScrollTo(sectionId: string, duration = 1000) {
      const targetElement = document.getElementById(sectionId);
      if (!targetElement) return;

      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
      const extraOffset = 15;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        extraOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      function easeInOutQuad(
        time: number,
        start: number,
        change: number,
        duration: number
      ) {
        time /= duration / 2;
        if (time < 1) return (change / 2) * time * time + start;
        time--;
        return (-change / 2) * (time * (time - 2) - 1) + start;
      }

      function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }

    // Scroll to section function
    function scrollToSection(sectionId: string) {
      smoothScrollTo(sectionId, 1000);
    }

    // Global functions for selecting class and deck
    (window as any).selectClass = function (selectedClass: string) {
      // Hide decks and length sections
      document.getElementById("vclass-decks")?.classList.add("d-none");
      document.getElementById("lclass-decks")?.classList.add("d-none");
      document.getElementById("vclass-length")?.classList.add("d-none");
      document.getElementById("lclass-length")?.classList.add("d-none");

      // Remove selected classes
      document.getElementById("vclass")?.classList.remove("selected");
      document.getElementById("lclass")?.classList.remove("selected");

      // Show the selected class's deck and add selected class styling
      if (selectedClass === "vclass") {
        document.getElementById("vclass-decks")?.classList.remove("d-none");
        document.getElementById("vclass")?.classList.add("selected");
      } else {
        document.getElementById("lclass-decks")?.classList.remove("d-none");
        document.getElementById("lclass")?.classList.add("selected");
      }

      scrollToSection("step2");
    };

    (window as any).selectDeck = function (...selectedDecks: string[]) {
      const lengthButtons = ["v700t", "v25QS", "L23QS", "L25QS"];
      lengthButtons.forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.classList.add("d-none");
      });

      document.getElementById("vclass-length")?.classList.add("d-none");
      document.getElementById("lclass-length")?.classList.add("d-none");
      document
        .querySelectorAll(".boat-deck")
        .forEach((deck) => deck.classList.remove("selected-deck"));

      if (selectedDecks.includes("L23QS") || selectedDecks.includes("L25QS")) {
        document.getElementById("lclass-length")?.classList.remove("d-none");
        document.getElementById("L23QS")?.classList.remove("d-none");
        document.getElementById("L25QS")?.classList.remove("d-none");
      } else if (
        selectedDecks.includes("v700t") ||
        selectedDecks.includes("v25QS")
      ) {
        document.getElementById("vclass-length")?.classList.remove("d-none");
        selectedDecks.forEach((deck) => {
          const btn = document.getElementById(deck);
          if (btn) btn.classList.remove("d-none");
        });
      }

      selectedDecks.forEach((deck) => {
        const deckElement = document.getElementById(deck + "-deck");
        if (deckElement) deckElement.classList.add("selected-deck");
      });

      scrollToSection("step3");
    };

    // Cleanup event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Vanderbilt Pontoons</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Header */}
      <header className="container-fluid sticky-top shadow-sm">
        <div className="d-flex justify-content-between align-items-center p-3 ms-5">
          <Link
            href="https://vanderbiltpontoons.com/"
            className="text-dark text-decoration-none fw-bold ms-5 py-2"
          >
            <img
              style={{ width: "75%" }}
              src="https://vanderbiltpontoons.com/wp-content/uploads/2024/07/Vanderbilt-Logo-Tagline_white-1.png"
              alt="vanderbiltpontoons"
            />
          </Link>
          <div className="header-user"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mt-5">
        {/* Step 1: Select Class */}
        <section id="step1" className="mt-5">
          <h1
            className="fw-light my-3 text-center"
            style={{ letterSpacing: ".5rem" }}
          >
            Design Your Pontoon
          </h1>
          <h3 className="fw-light my-3 text-center">
            <strong>Step 1 of 3: </strong>Choose a Class
          </h3>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div
              className="col p-5 class-box"
              id="vclass"
              onClick={() => window.selectClass("vclass")}
              style={{ cursor: "pointer" }}
            >
              <div className="img-container">
                <img
                  src="/images/Vanderbilt - BAB color changer_r05.png"
                  className="img-fluid"
                  alt="V Class Boat"
                />
              </div>
              <h4 className="my-3 text-center">V CLASS</h4>
              <p className="mb-2">
                The Vanderbilt flagship, the V Class elevates every journey to
                first class with refined luxury with elegance.
              </p>
              <p className="mb-0 text-center">
                <strong>Premium Luxury - $$$$</strong>
              </p>
              <p className="mb-2 text-center">
                <strong>Model Lengths - 25ft, 31ft</strong>
              </p>
              <ul>
                <li>Single and twin outboard models</li>
                <li>Serenity Drive™ tritoon package</li>
                <li>
                  Exclusive aft bar lounge with extended deck (V700T, twin
                  power)
                </li>
              </ul>
            </div>
            <div
              className="col p-5 class-box"
              id="lclass"
              onClick={() => window.selectClass("lclass")}
              style={{ cursor: "pointer" }}
            >
              <div className="img-container2">
                <img
                  src="/images/Vanderbilt - BAB color changer_r05 L-class.png"
                  className="img-fluid"
                  alt="L Class Boat"
                />
              </div>
              <h4 className="my-3 text-center">L CLASS</h4>
              <p className="mb-2">
                New for 2025. The L Class delivers a dynamic blend of
                performance and luxury at a more accessible price.
              </p>
              <p className="mb-0 text-center">
                <strong>Sport Luxury - $$$</strong>
              </p>
              <p className="mb-2 text-center">
                <strong>Model Lengths - 23ft, 25ft</strong>
              </p>
              <ul>
                <li>
                  New for 2025 – well-equipped with plush standard features
                </li>
                <li>Serenity Drive™ tritoon package</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="line-with-circle"></div>

        {/* Step 2: Select Layout */}
        <section id="step2" className="mt-5">
          <h3 className="fw-light my-3 text-center">
            <strong>Step 2 of 3: </strong>Choose a Model
          </h3>
          <div id="vclass-decks" className="d-none">
            <div
              className="row align-items-center mt-4 boat-deck"
              id="v700t-deck"
              onClick={() => window.selectDeck("v700t")}
            >
              <div className="col-lg-6">
                <img
                  src="https://vanderbiltpontoons.com/wp-content/uploads/2024/11/V31TX-QS-Overhead.png"
                  className="img-fluid"
                  alt="Layout C"
                />
              </div>
              <div className="col-lg-6">
                <h5 className="mt-3">Quad Seating with Rear Lounge</h5>
                <ul>
                  <li>Quad chaise lounges – seating in each corner</li>
                  <li>
                    Exclusive rear entertainment lounge with extended deck
                  </li>
                  <li>Twin outboard performance and stability</li>
                </ul>
              </div>
            </div>
            <div
              className="row align-items-center mt-4 boat-deck"
              id="v25QS-deck"
              onClick={() => window.selectDeck("v25QS")}
            >
              <div className="col-lg-6">
                <img
                  src="https://vanderbiltpontoons.com/wp-content/uploads/2024/11/V25-QS-Overhead-with-Gray-Plates.png"
                  className="img-fluid"
                  alt="Layout L"
                />
              </div>
              <div className="col-lg-6">
                <h5 className="mt-3">Quad Seating</h5>
                <ul>
                  <li>Quad chaise lounges – seating in each corner</li>
                  <li>
                    Extended swim platform with pet-friendly, easy access swim
                    ladder
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div id="lclass-decks" className="d-none">
              <div
                className="row align-items-center mt-4 boat-deck"
                id="L23QS-deck"
                onClick={() => window.selectDeck("L23QS")}
              >
                <div className="col-lg-6">
                  <img
                    src="https://vanderbiltpontoons.com/wp-content/uploads/2024/11/Vanderbilt-L-23-UL.png"
                    className="img-fluid"
                    alt="Layout C"
                  />
                </div>
                <div className="col-lg-6">
                  <h5 className="mt-3">Rear Ultra Lounge</h5>
                  <ul>
                    <li>
                      Rear lounger with adjustable forward, rear, and sun bed
                      positions
                    </li>
                    <li>Side-by-side front chaise lounges</li>
                  </ul>
                </div>
              </div>
              <div
                className="row align-items-center mt-4 boat-deck"
                id="L25QS-deck"
                onClick={() => window.selectDeck("L25QS")}
              >
                <div className="col-lg-6">
                  <img
                    src="https://vanderbiltpontoons.com/wp-content/uploads/2024/11/Vanderbilt-L-23-QS-0067.png"
                    className="img-fluid"
                    alt="Layout L"
                  />
                </div>
                <div className="col-lg-6">
                  <h5 className="mt-3">Quad Seating</h5>
                  <ul>
                    <li>Dual side-by-side front and rear chaise lounges</li>
                    <li>Spacious walkway from front to rear</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="line-with-circle"></div>

        {/* Step 3: Select Length */}
        <section id="step3" className="my-5 text-center">
          <h3 className="fw-light my-3 text-center">
            <strong>Step 3 of 3: </strong>Choose a Length
          </h3>
          <div
            id="vclass-length"
            className="d-none d-flex justify-content-center gap-3 mt-5 mb-50"
          >
             <Link
                id="v700t" href={`/build/3d/vclass?length=31`}
                className="btn btn-primary btn-responsive px-4 w-25"
              >
                31 FT
              </Link>
            <Link
              id="v25QS" href={`/build/3d/vclass?length=25`}
              className="btn btn-primary btn-responsive px-4 w-25"
            >
              25 FT
            </Link>
          </div>
          <div
            id="lclass-length"
            className="d-none d-flex justify-content-center gap-3 mt-5 mb-50"
          >
            <Link
                id="L23QS" href={`/build/3d/lclass?length=23`}
                className="btn btn-primary btn-responsive px-4 w-25"
              >
                23 FT
              </Link>
            <Link
              id="L25QS" href={`/build/3d/lclass?length=25`}
              className="btn btn-primary btn-responsive px-4 w-25"
            >
              25 FT
            </Link>
          </div>
        </section>

        <button id="backToTop" className="back-to-top" aria-label="Back to top">
          <span>^</span>
        </button>
      </main>
    </>
  );
}
