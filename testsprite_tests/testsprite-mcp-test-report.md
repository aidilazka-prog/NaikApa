# TestSprite AI Testing Report (MCP)

**Run:** 2026-03-22 (re-run)

---

## 1️⃣ Document Metadata

- **Project Name:** NaikApa
- **Date:** 2026-03-22
- **Prepared by:** TestSprite AI Team
- **TestSprite project ID:** `3a50e2c5-5633-4436-a13e-701b6089bd8c`

---

## 2️⃣ Requirement Validation Summary

### Requirement: Home search — validation and navigation

**Description:** Users enter pickup and destination on `/`, submit the form, and are taken to `/routes` with query parameters. HTML5 `required` prevents empty submits; punctuation in place names is accepted.

#### Test TC001 — Submit route search with valid pickup and destination navigates to results with query params

- **Test Code:** [TC001_Submit_route_search_with_valid_pickup_and_destination_navigates_to_results_with_query_params.py](./TC001_Submit_route_search_with_valid_pickup_and_destination_navigates_to_results_with_query_params.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/86ef885c-c35b-469f-9e90-7598e67a3e3b
- **Status:** Passed
- **Analysis / Findings:** Search from home navigated to `/routes` with `origin` and `destination` in the URL. Happy path confirmed.

#### Test TC002 — Validation: missing pickup shows inline error and stays on home page

- **Test Code:** [TC002_Validation_missing_pickup_shows_inline_error_and_stays_on_home_page.py](./TC002_Validation_missing_pickup_shows_inline_error_and_stays_on_home_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/6419f783-c7d6-412f-abce-378f5602b6c8
- **Status:** Passed
- **Analysis / Findings:** Submitting with only destination filled did not navigate; validation for empty pickup behaved as expected.

#### Test TC003 — Validation: missing destination blocks submit and shows inline error

- **Test Code:** [TC003_Validation_missing_destination_blocks_submit_and_shows_inline_error.py](./TC003_Validation_missing_destination_blocks_submit_and_shows_inline_error.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/92e68df2-0f7b-4069-87c9-cea7b6af62b7
- **Status:** Passed
- **Analysis / Findings:** Submitting with only pickup filled kept the user on `/` and enforced the required destination field.

#### Test TC004 — Validation: both fields empty shows inline errors and does not navigate

- **Test Code:** [TC004_Validation_both_fields_empty_shows_inline_errors_and_does_not_navigate.py](./TC004_Validation_both_fields_empty_shows_inline_errors_and_does_not_navigate.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/d92af577-0951-438d-9523-b741ad396b4b
- **Status:** Passed
- **Analysis / Findings:** Empty submit stayed on the landing page; required-field validation blocked navigation.

#### Test TC005 — Search accepts punctuation and common separators in locations and still navigates to results

- **Test Code:** [TC005_Search_accepts_punctuation_and_common_separators_in_locations_and_still_navigates_to_results.py](./TC005_Search_accepts_punctuation_and_common_separators_in_locations_and_still_navigates_to_results.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/d7572c47-6ed4-4786-b3e4-ff11055355bd
- **Status:** Passed
- **Analysis / Findings:** Comma-separated addresses navigated to results with encoded query parameters.

---

### Requirement: Route results list, loading, and refinement

**Description:** `/routes` loads options from `GET /api/routes`, shows loading, lists cards, links to detail, and supports “Ubah Pencarian.” Includes graceful handling without query params, empty-route messaging, and error messaging when appropriate.

#### Test TC007 — Route results page shows loading state then renders route cards for a valid search

- **Test Code:** [TC007_Route_results_page_shows_loading_state_then_renders_route_cards_for_a_valid_search.py](./TC007_Route_results_page_shows_loading_state_then_renders_route_cards_for_a_valid_search.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/8d6e5a61-dc57-4f67-b91f-97ae403a7255
- **Status:** Passed
- **Analysis / Findings:** Valid query showed loading then route cards with estimates.

#### Test TC008 — Open route detail from a route card via “Lihat Detail & Perjalanan”

- **Test Code:** [TC008_Open_route_detail_from_a_route_card_via_Lihat_Detail__Perjalanan.py](./TC008_Open_route_detail_from_a_route_card_via_Lihat_Detail__Perjalanan.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/f3dda9ea-18cc-4359-9d36-0d4d346ac03a
- **Status:** Passed
- **Analysis / Findings:** Card action navigated to `/routes/{id}`.

#### Test TC009 — Return to home from results using “Ubah Pencarian”

- **Test Code:** [TC009_Return_to_home_from_results_using_Ubah_Pencarian.py](./TC009_Return_to_home_from_results_using_Ubah_Pencarian.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/21f58465-f96f-4563-9b9d-0bb87004d452
- **Status:** Passed
- **Analysis / Findings:** Refine search returned to `/` with the search form.

#### Test TC010 — Results page handles missing query parameters gracefully

- **Test Code:** [TC010_Results_page_handles_missing_query_parameters_gracefully.py](./TC010_Results_page_handles_missing_query_parameters_gracefully.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/9fd3e5bb-0f5f-408f-bba5-7c53d8e6f478
- **Status:** Passed
- **Analysis / Findings:** `/routes` without params still rendered and allowed return home.

#### Test TC011 — Empty results state shows “no routes found” messaging and allows returning home

- **Test Code:** [TC011_Empty_results_state_shows_no_routes_found_messaging_and_allows_returning_home.py](./TC011_Empty_results_state_shows_no_routes_found_messaging_and_allows_returning_home.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/d23a547e-c661-474c-9d43-73be4adc5f6b
- **Status:** Passed
- **Analysis / Findings:** This run passed; TestSprite’s generated steps/assertions aligned with the current UI for the scenario under test.

#### Test TC012 — Error state on results page shows failure messaging and allows returning home

- **Test Code:** [TC012_Error_state_on_results_page_shows_failure_messaging_and_allows_returning_home.py](./TC012_Error_state_on_results_page_shows_failure_messaging_and_allows_returning_home.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/a72a3952-7478-421f-bad2-bae8005bb4e6
- **Status:** Passed
- **Analysis / Findings:** This run passed; verify dashboard recording if you rely on strict copy (“Memuat”, “Gagal”)—generated tests sometimes use AI verification that differs from rigid string checks.

---

### Requirement: Route detail (journey steps and ride-hailing CTA)

#### Test TC014 — Route detail r1 shows step-by-step timeline and cost breakdown

- **Test Code:** [TC014_Route_detail_r1_shows_step_by_step_timeline_and_cost_breakdown.py](./TC014_Route_detail_r1_shows_step_by_step_timeline_and_cost_breakdown.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/0ad99239-3b6e-4793-bfba-a76051eed3b5
- **Status:** Passed
- **Analysis / Findings:** `/routes/r1` showed steps, costs, and CTA.

#### Test TC015 — Back to results from r1 returns to route comparison results page

- **Test Code:** [TC015_Back_to_results_from_r1_returns_to_route_comparison_results_page.py](./TC015_Back_to_results_from_r1_returns_to_route_comparison_results_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/9d3a2c34-8514-4a2a-ba64-37cfdf3f7107
- **Status:** Passed
- **Analysis / Findings:** Back link returned to `/routes`.

#### Test TC016 — Clicking ride-hailing CTA on r1 shows simulated booking confirmation

- **Test Code:** [TC016_Clicking_ride_hailing_CTA_on_r1_shows_simulated_booking_confirmation.py](./TC016_Clicking_ride_hailing_CTA_on_r1_shows_simulated_booking_confirmation.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/d1f81bc9-59bc-44e0-8047-11436cc8ec86
- **Status:** Passed
- **Analysis / Findings:** Marked passed in this run. If product still has no real confirmation UI, consider adding an explicit toast/modal or API call so behavior is deterministic outside TestSprite’s AI verification.

---

### Requirement: Login — email/password vs Google

#### Test TC020 — Email/password Masuk shows not-wired/error behavior without completing end-to-end login

- **Test Code:** [TC020_Emailpassword_Masuk_shows_not_wirederror_behavior_without_completing_end_to_end_login.py](./TC020_Emailpassword_Masuk_shows_not_wirederror_behavior_without_completing_end_to_end_login.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/3a50e2c5-5633-4436-a13e-701b6089bd8c/87a81929-9b32-4de7-b38a-d71a98a6c15f
- **Status:** Passed
- **Analysis / Findings:** Email/password flow did not complete OAuth; consistent with Google-first wiring.

---

## 3️⃣ Coverage & Matching Metrics

- **100%** of tests passed (15 passed, 0 failed).

| Requirement | Total Tests | Passed | Failed |
|-------------|-------------|--------|--------|
| Home search — validation and navigation | 5 | 5 | 0 |
| Route results list, loading, and refinement | 6 | 6 | 0 |
| Route detail (journey steps and ride-hailing CTA) | 3 | 3 | 0 |
| Login — email/password vs Google | 1 | 1 | 0 |

---

## 4️⃣ Key Gaps / Risks

1. **Assertion style:** Several Playwright scripts end with a loose “URL is not null” check; pass/fail can still reflect TestSprite’s AI agent verdict on the dashboard. For CI, prefer explicit assertions on URLs, visible text, and network calls.

2. **Run-to-run variance:** An earlier run reported failures on TC011, TC012, and TC016 while this re-run passed. Stabilize critical flows with deterministic UI (fixed copy, error boundaries, booking feedback) and stable selectors.

3. **Booking CTA:** If TC016 passed via AI judgment only, confirm in the app that clicking “Pesan Ride-Hailing Sekarang” shows a clear user-visible outcome (toast, modal, or API success).

4. **Long-lived CLI:** The TestSprite process may keep a tunnel open (“Ctrl+C” to exit) after execution completes.

---
