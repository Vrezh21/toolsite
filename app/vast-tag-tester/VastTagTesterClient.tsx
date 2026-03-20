"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

declare global {
    interface Window {
        google?: any;
    }
}

type LogItem = {
    id: number;
    type: "info" | "success" | "warning" | "error";
    message: string;
    time: string;
};

const DEFAULT_TAG =
    "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&ciu_szs=300x250&cust_params=sample_ct%3Dlinear&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&impl=s&correlator=";

function nowLabel() {
    return new Date().toLocaleTimeString();
}

function classForLog(type: LogItem["type"]) {
    if (type === "success") return "border-green-200 bg-green-50 text-green-800";
    if (type === "warning") return "border-yellow-200 bg-yellow-50 text-yellow-800";
    if (type === "error") return "border-red-200 bg-red-50 text-red-800";
    return "border-slate-200 bg-slate-50 text-slate-800";
}

export default function VastTagTesterClient() {
    const [tagUrl, setTagUrl] = useState(DEFAULT_TAG);
    const [sdkReady, setSdkReady] = useState(false);
    const [logs, setLogs] = useState<LogItem[]>([]);
    const [xmlPreview, setXmlPreview] = useState("");
    const [xmlError, setXmlError] = useState("");
    const [isFetchingXml, setIsFetchingXml] = useState(false);
    const [isLoadingAd, setIsLoadingAd] = useState(false);
    const [adPlaying, setAdPlaying] = useState(false);
    const [lastStatus, setLastStatus] = useState("Idle");
    const [adInfo, setAdInfo] = useState<{
        title?: string;
        description?: string;
        advertiser?: string;
        duration?: number | null;
        skipTimeOffset?: number | null;
        isLinear?: boolean;
        clickThroughUrl?: string;
    } | null>(null);

    const contentVideoRef = useRef<HTMLVideoElement | null>(null);
    const adContainerRef = useRef<HTMLDivElement | null>(null);
    const adsLoaderRef = useRef<any>(null);
    const adsManagerRef = useRef<any>(null);
    const adDisplayContainerRef = useRef<any>(null);
    const logIdRef = useRef(1);

    const hasLogs = useMemo(() => logs.length > 0, [logs]);

    const addLog = (type: LogItem["type"], message: string) => {
        setLogs((prev) => [
            {
                id: logIdRef.current++,
                type,
                message,
                time: nowLabel(),
            },
            ...prev,
        ]);
    };

    const destroyAdsManager = () => {
        try {
            if (adsManagerRef.current) {
                adsManagerRef.current.destroy();
            }
        } catch {
            //
        }

        adsManagerRef.current = null;
        setAdPlaying(false);
    };

    useEffect(() => {
        const existing = document.querySelector(
            'script[src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"]'
        ) as HTMLScriptElement | null;

        const onReady = () => {
            if (window.google?.ima) {
                try {
                    window.google.ima.settings.setVpaidMode(
                        window.google.ima.ImaSdkSettings.VpaidMode.ENABLED
                    );
                    window.google.ima.settings.setPlayerType("toolsite-ink");
                    window.google.ima.settings.setPlayerVersion("1.0.0");
                } catch {
                    //
                }

                setSdkReady(true);
                addLog("success", "Google IMA SDK loaded.");
            }
        };

        if (existing) {
            if (window.google?.ima) {
                onReady();
            } else {
                existing.addEventListener("load", onReady);
            }

            return () => {
                existing.removeEventListener("load", onReady);
            };
        }

        const script = document.createElement("script");
        script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
        script.async = true;
        script.onload = onReady;
        script.onerror = () => {
            setSdkReady(false);
            addLog("error", "Failed to load Google IMA SDK.");
        };

        document.body.appendChild(script);

        return () => {
            script.onload = null;
            script.onerror = null;
            destroyAdsManager();
        };
    }, []);

    useEffect(() => {
        const video = contentVideoRef.current;
        if (!video) return;

        const onEnded = () => {
            if (adsLoaderRef.current && window.google?.ima) {
                try {
                    adsLoaderRef.current.contentComplete();
                    addLog("info", "Content complete event sent to IMA.");
                } catch {
                    //
                }
            }
        };

        video.addEventListener("ended", onEnded);
        return () => video.removeEventListener("ended", onEnded);
    }, []);

    const clearLogs = () => {
        setLogs([]);
        setLastStatus("Idle");
    };

    const clearAll = () => {
        destroyAdsManager();
        setXmlPreview("");
        setXmlError("");
        setAdInfo(null);
        setLastStatus("Idle");
        setAdPlaying(false);
        setIsLoadingAd(false);
        setLogs([]);
    };

    const fetchXmlPreview = async () => {
        if (!tagUrl.trim()) return;

        setIsFetchingXml(true);
        setXmlPreview("");
        setXmlError("");

        try {
            const res = await fetch(tagUrl, {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const text = await res.text();
            setXmlPreview(text.slice(0, 50000));
            addLog("success", "XML preview loaded.");
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to fetch XML preview.";

            setXmlError(
                `Could not fetch XML preview. The tag may block cross-origin requests or may not return plain XML. Details: ${message}`
            );
            addLog(
                "warning",
                "XML preview failed. This is often caused by CORS restrictions."
            );
        } finally {
            setIsFetchingXml(false);
        }
    };

    const setupAdsLoader = () => {
        if (!window.google?.ima) {
            addLog("error", "IMA SDK is not ready yet.");
            return null;
        }

        const video = contentVideoRef.current;
        const adContainer = adContainerRef.current;

        if (!video || !adContainer) {
            addLog("error", "Video element or ad container is missing.");
            return null;
        }

        destroyAdsManager();

        adDisplayContainerRef.current = new window.google.ima.AdDisplayContainer(
            adContainer,
            video
        );

        const adsLoader = new window.google.ima.AdsLoader(
            adDisplayContainerRef.current
        );

        adsLoaderRef.current = adsLoader;

        adsLoader.addEventListener(
            window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            (event: any) => {
                addLog("success", "AdsManager loaded.");
                setLastStatus("AdsManager loaded");

                const adsRenderingSettings = new window.google.ima.AdsRenderingSettings();
                adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
                adsRenderingSettings.enablePreloading = true;

                try {
                    adsManagerRef.current = event.getAdsManager(
                        contentVideoRef.current,
                        adsRenderingSettings
                    );
                } catch (err) {
                    const msg =
                        err instanceof Error ? err.message : "Unknown AdsManager error.";
                    addLog("error", `Failed to create AdsManager: ${msg}`);
                    setLastStatus("AdsManager create failed");
                    setIsLoadingAd(false);
                    return;
                }

                const adsManager = adsManagerRef.current;

                const adEvents = [
                    window.google.ima.AdEvent.Type.LOADED,
                    window.google.ima.AdEvent.Type.STARTED,
                    window.google.ima.AdEvent.Type.FIRST_QUARTILE,
                    window.google.ima.AdEvent.Type.MIDPOINT,
                    window.google.ima.AdEvent.Type.THIRD_QUARTILE,
                    window.google.ima.AdEvent.Type.COMPLETE,
                    window.google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
                    window.google.ima.AdEvent.Type.CLICK,
                    window.google.ima.AdEvent.Type.SKIPPED,
                    window.google.ima.AdEvent.Type.PAUSED,
                    window.google.ima.AdEvent.Type.RESUMED,
                    window.google.ima.AdEvent.Type.VOLUME_CHANGED,
                    window.google.ima.AdEvent.Type.VOLUME_MUTED,
                    window.google.ima.AdEvent.Type.LOG,
                    window.google.ima.AdEvent.Type.AD_PROGRESS,
                    window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
                    window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
                ];

                adEvents.forEach((eventType) => {
                    adsManager.addEventListener(eventType, (e: any) => {
                        const type = e.type || "UNKNOWN_EVENT";

                        if (type === window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED) {
                            setAdPlaying(true);
                            setLastStatus("Ad playback started");

                            if (contentVideoRef.current) {
                                contentVideoRef.current.pause();
                            }

                            addLog("info", "Content pause requested.");
                            return;
                        }

                        if (
                            type === window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED
                        ) {
                            setAdPlaying(false);
                            setLastStatus("Content resumed");

                            if (contentVideoRef.current) {
                                contentVideoRef.current.play().catch(() => {
                                    //
                                });
                            }

                            addLog("info", "Content resume requested.");
                            return;
                        }

                        if (type === window.google.ima.AdEvent.Type.LOG) {
                            addLog("warning", "IMA LOG event received.");
                            return;
                        }

                        const ad = e.getAd ? e.getAd() : null;

                        if (ad && type === window.google.ima.AdEvent.Type.LOADED) {
                            setAdInfo({
                                title: ad.getTitle ? ad.getTitle() : "",
                                description: ad.getDescription ? ad.getDescription() : "",
                                advertiser: ad.getAdvertiserName ? ad.getAdvertiserName() : "",
                                duration: ad.getDuration ? ad.getDuration() : null,
                                skipTimeOffset: ad.getSkipTimeOffset
                                    ? ad.getSkipTimeOffset()
                                    : null,
                                isLinear: ad.isLinear ? ad.isLinear() : undefined,
                                clickThroughUrl: ad.getClickThroughUrl
                                    ? ad.getClickThroughUrl()
                                    : "",
                            });
                        }

                        addLog("success", `Ad event: ${type}`);
                        setLastStatus(type);
                    });
                });

                adsManager.addEventListener(
                    window.google.ima.AdErrorEvent.Type.AD_ERROR,
                    (adErrorEvent: any) => {
                        const error = adErrorEvent.getError();

                        const message = error?.getMessage?.() || "Unknown IMA ad error";
                        const errorCode = error?.getErrorCode?.();
                        const errorType = error?.getType?.();
                        const vastErrorCode = error?.getVastErrorCode?.();
                        const innerError = error?.getInnerError?.();

                        addLog(
                            "error",
                            `Ad error: ${message}${errorCode !== undefined ? ` | code: ${errorCode}` : ""
                            }${errorType !== undefined ? ` | type: ${errorType}` : ""
                            }${vastErrorCode !== undefined ? ` | vastCode: ${vastErrorCode}` : ""
                            }${innerError ? ` | innerError: ${String(innerError)}` : ""
                            }`
                        );

                        setLastStatus("Ad error");
                        setIsLoadingAd(false);
                        destroyAdsManager();

                        if (contentVideoRef.current) {
                            contentVideoRef.current.play().catch(() => {
                                //
                            });
                        }
                    }
                );

                try {
                    const width = adContainerRef.current?.offsetWidth || 640;
                    const height = adContainerRef.current?.offsetHeight || 360;

                    adsManager.init(width, height, window.google.ima.ViewMode.NORMAL);
                    adsManager.start();

                    addLog("success", "Ad request started.");
                    setLastStatus("Ad request started");
                    setIsLoadingAd(false);
                } catch (err) {
                    const msg =
                        err instanceof Error ? err.message : "Failed to start ad.";

                    addLog("error", `AdsManager start failed: ${msg}`);
                    setLastStatus("AdsManager start failed");
                    setIsLoadingAd(false);

                    if (contentVideoRef.current) {
                        contentVideoRef.current.play().catch(() => {
                            //
                        });
                    }
                }
            }
        );

        adsLoader.addEventListener(
            window.google.ima.AdErrorEvent.Type.AD_ERROR,
            (event: any) => {
                const error = event.getError();

                const message = error?.getMessage?.() || "Unknown loader error";
                const errorCode = error?.getErrorCode?.();
                const errorType = error?.getType?.();
                const vastErrorCode = error?.getVastErrorCode?.();
                const innerError = error?.getInnerError?.();

                addLog(
                    "error",
                    `AdsLoader error: ${message}${errorCode !== undefined ? ` | code: ${errorCode}` : ""
                    }${errorType !== undefined ? ` | type: ${errorType}` : ""
                    }${vastErrorCode !== undefined ? ` | vastCode: ${vastErrorCode}` : ""
                    }${innerError ? ` | innerError: ${String(innerError)}` : ""
                    }`
                );

                setLastStatus("AdsLoader error");
                setIsLoadingAd(false);
                destroyAdsManager();
            }
        );

        return adsLoader;
    };

    const loadAndPlayAd = async () => {
        if (!tagUrl.trim()) {
            addLog("warning", "Enter a VAST or VMAP tag URL first.");
            return;
        }

        if (!sdkReady || !window.google?.ima) {
            addLog("warning", "IMA SDK is still loading.");
            return;
        }

        const video = contentVideoRef.current;
        const adContainer = adContainerRef.current;

        if (!video || !adContainer) {
            addLog("error", "Missing player elements.");
            return;
        }

        setIsLoadingAd(true);
        setAdInfo(null);
        setLastStatus("Initializing");
        addLog("info", "Initializing ad playback.");

        try {
            const adsLoader = setupAdsLoader();
            if (!adsLoader) {
                setIsLoadingAd(false);
                return;
            }

            adDisplayContainerRef.current.initialize();
            addLog("success", "AdDisplayContainer initialized.");

            const adsRequest = new window.google.ima.AdsRequest();
            adsRequest.adTagUrl = tagUrl.trim();
            adsRequest.linearAdSlotWidth = adContainer.offsetWidth || 640;
            adsRequest.linearAdSlotHeight = adContainer.offsetHeight || 360;
            adsRequest.nonLinearAdSlotWidth = adContainer.offsetWidth || 640;
            adsRequest.nonLinearAdSlotHeight = 150;

            adsLoader.requestAds(adsRequest);
            addLog("info", "Ad tag requested.");
            setLastStatus("Ad requested");

            try {
                await video.play();
                video.pause();
            } catch {
                //
            }
        } catch (err) {
            const msg =
                err instanceof Error ? err.message : "Unknown initialization error.";

            addLog("error", `Failed to initialize ad request: ${msg}`);
            setIsLoadingAd(false);
            setLastStatus("Initialization failed");
        }
    };

    const useSampleTag = () => {
        setTagUrl(DEFAULT_TAG);
        addLog("info", "Google sample ad tag inserted.");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <ToolStructuredData
                name="VAST Tag Tester"
                description="Test VAST, VMAP, and legacy VPAID ad tags online with a player, XML preview, and event log."
                url="https://toolsite.ink/vast-tag-tester"
            />

            <main className="mx-auto max-w-6xl px-4 py-10">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Tools", href: "/tools" },
                        { label: "VAST Tag Tester" },
                    ]}
                />

                <h1 className="text-4xl font-bold text-slate-900">VAST Tag Tester</h1>
                <p className="mt-3 text-lg text-slate-700">
                    Test VAST, VMAP, and legacy VPAID ad tags in a player, inspect ad
                    events, and preview XML when the tag allows it.
                </p>

                <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
                    <label className="mb-2 block text-sm font-medium text-slate-800">
                        VAST / VMAP / ad tag URL
                    </label>

                    <textarea
                        value={tagUrl}
                        onChange={(e) => setTagUrl(e.target.value)}
                        rows={4}
                        placeholder="Paste a VAST, VMAP, or Google IMA-compatible ad tag URL..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                    />

                    <div className="mt-4 flex flex-wrap gap-3">
                        <button
                            onClick={loadAndPlayAd}
                            disabled={!sdkReady || isLoadingAd}
                            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoadingAd ? "Loading..." : "Load and Play Ad"}
                        </button>

                        <button
                            onClick={fetchXmlPreview}
                            disabled={isFetchingXml || !tagUrl.trim()}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isFetchingXml ? "Loading XML..." : "Preview XML"}
                        </button>

                        <button
                            onClick={useSampleTag}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
                        >
                            Use Sample Tag
                        </button>

                        <button
                            onClick={clearLogs}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
                        >
                            Clear Log
                        </button>

                        <button
                            onClick={clearAll}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <div className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                            SDK: {sdkReady ? "Ready" : "Loading"}
                        </div>
                        <div className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                            Status: {lastStatus}
                        </div>
                        <div className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                            Mode: VAST / VMAP / VPAID
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                    <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Player Preview
                        </h2>

                        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-black">
                            <div
                                ref={adContainerRef}
                                className="relative aspect-video w-full bg-black"
                            >
                                <video
                                    ref={contentVideoRef}
                                    controls
                                    playsInline
                                    className="absolute inset-0 h-full w-full"
                                    poster="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='36' font-family='Arial'%3EVAST Tag Tester%3C/text%3E%3C/svg%3E"
                                >
                                    <source
                                        src="https://storage.googleapis.com/gvabox/media/samples/stock.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                        </div>

                        <p className="mt-3 text-sm text-slate-600">
                            Click <strong>Load and Play Ad</strong> after pasting a tag. The
                            IMA SDK requires user interaction before initializing ad playback.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-900">Ad Details</h2>

                        {adInfo ? (
                            <div className="mt-4 space-y-3 text-sm text-slate-700">
                                <div>
                                    <span className="font-medium text-slate-900">Title:</span>{" "}
                                    {adInfo.title || "—"}
                                </div>
                                <div>
                                    <span className="font-medium text-slate-900">
                                        Advertiser:
                                    </span>{" "}
                                    {adInfo.advertiser || "—"}
                                </div>
                                <div>
                                    <span className="font-medium text-slate-900">Duration:</span>{" "}
                                    {typeof adInfo.duration === "number"
                                        ? `${adInfo.duration}s`
                                        : "—"}
                                </div>
                                <div>
                                    <span className="font-medium text-slate-900">
                                        Skip offset:
                                    </span>{" "}
                                    {typeof adInfo.skipTimeOffset === "number"
                                        ? `${adInfo.skipTimeOffset}s`
                                        : "—"}
                                </div>
                                <div>
                                    <span className="font-medium text-slate-900">Linear:</span>{" "}
                                    {typeof adInfo.isLinear === "boolean"
                                        ? adInfo.isLinear
                                            ? "Yes"
                                            : "No"
                                        : "—"}
                                </div>
                                <div className="break-all">
                                    <span className="font-medium text-slate-900">
                                        Clickthrough:
                                    </span>{" "}
                                    {adInfo.clickThroughUrl || "—"}
                                </div>
                                {adInfo.description ? (
                                    <div>
                                        <span className="font-medium text-slate-900">
                                            Description:
                                        </span>{" "}
                                        {adInfo.description}
                                    </div>
                                ) : null}
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-slate-600">
                                Ad metadata will appear here after the ad loads.
                            </p>
                        )}

                        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="text-sm font-medium text-slate-900">
                                Current playback state
                            </div>
                            <div className="mt-2 text-sm text-slate-700">
                                {adPlaying ? "Ad is playing." : "No active ad playback."}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-xl font-semibold text-slate-900">
                                Event Log
                            </h2>
                            <div className="text-sm text-slate-500">
                                {hasLogs ? `${logs.length} events` : "No events yet"}
                            </div>
                        </div>

                        <div className="mt-4 max-h-[500px] overflow-auto space-y-3">
                            {hasLogs ? (
                                logs.map((log) => (
                                    <div
                                        key={log.id}
                                        className={`rounded-xl border p-3 text-sm ${classForLog(
                                            log.type
                                        )}`}
                                    >
                                        <div className="mb-1 text-xs opacity-70">{log.time}</div>
                                        <div>{log.message}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                                    Start a test to see loader events, ad events, and errors.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-xl font-semibold text-slate-900">
                                XML Preview
                            </h2>
                            <div className="text-sm text-slate-500">
                                Preview may fail if the ad server blocks CORS
                            </div>
                        </div>

                        {xmlError ? (
                            <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                                {xmlError}
                            </div>
                        ) : null}

                        <textarea
                            value={xmlPreview}
                            readOnly
                            rows={20}
                            className="mt-4 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-900 outline-none"
                            placeholder="Click “Preview XML” to try loading the raw VAST or VMAP response..."
                        />
                    </div>
                </div>

                <SeoContent
                    aboutTitle="About this VAST Tag Tester"
                    aboutParagraphs={[
                        "This free VAST tag tester helps you load and inspect VAST, VMAP, and VPAID-compatible ad tags in a browser player.",
                        "It is useful for ad ops, publishers, developers, QA, and debugging client-side video ad integrations before using them in production.",
                    ]}
                    howToUseSteps={[
                        "Paste a VAST or VMAP ad tag URL into the input field.",
                        "Click “Load and Play Ad” to initialize the player and request the ad.",
                        "Review the event log, playback state, and ad metadata.",
                        "Use “Preview XML” to try loading the raw ad response when the server allows cross-origin access.",
                    ]}
                    faqItems={[
                        {
                            question: "Does this tool support VAST tags?",
                            answer:
                                "Yes, it is designed for testing VAST-compatible ad tags in a browser player.",
                        },
                        {
                            question: "Can it test VPAID tags?",
                            answer:
                                "Yes, it can test compatible VPAID creatives supported by the player environment.",
                        },
                        {
                            question: "Why can XML preview fail?",
                            answer:
                                "Some ad servers block direct browser fetch requests with CORS rules, so playback may still work while raw XML preview is blocked.",
                        },
                    ]}
                />

                <RelatedTools
                    currentSlug="vast-tag-tester"
                    category="tools"
                    title="Related tools"
                />
            </main>

            <Footer />
        </div>
    );
}