import { useRef, useState } from 'react';
import { Badge } from '../components/atoms/Badge';
import { Avatar } from '../components/atoms/Avatar';
import { Button } from '../components/atoms/Button';
import { Checkbox } from '../components/atoms/Checkbox';
import { Input } from '../components/atoms/Input';
import { LiveRegion } from '../components/atoms/LiveRegion';
import { ProgressBar } from '../components/atoms/ProgressBar';
import { Skeleton } from '../components/atoms/Skeleton';
import { SkipLink } from '../components/atoms/SkipLink';
import { Typography } from '../components/atoms/Typography';
import { Accordion } from '../components/molecules/Accordion';
import { AvatarGroup } from '../components/molecules/AvatarGroup';
import { Breadcrumbs } from '../components/molecules/Breadcrumbs';
import { CommandPalette } from '../components/molecules/CommandPalette';
import { Combobox } from '../components/molecules/Combobox';
import { DateRangePicker } from '../components/molecules/DateRangePicker';
import { FileUploader } from '../components/molecules/FileUploader';
import { FormErrorSummary } from '../components/molecules/FormErrorSummary';
import { FormField } from '../components/molecules/FormField';
import { InlineAlert } from '../components/molecules/InlineAlert';
import { LanguageSwitcher } from '../components/molecules/LanguageSwitcher';
import { MenuButton } from '../components/molecules/MenuButton';
import { MultiSelect } from '../components/molecules/MultiSelect';
import { Pagination } from '../components/molecules/Pagination';
import { RadioGroup } from '../components/molecules/RadioGroup';
import { Select } from '../components/molecules/Select';
import { Tabs } from '../components/molecules/Tabs';
import { Stepper } from '../components/molecules/Stepper';
import { TreeView } from '../components/molecules/TreeView';
import { Toast } from '../components/molecules/Toast';
import { Tooltip } from '../components/molecules/Tooltip';
import { Modal } from '../components/organisms/Modal';
import { DataTable } from '../components/organisms/DataTable';
import { AccessibleFormExample } from '../components/organisms/AccessibleFormExample';
import { AccessibleMultiStepForm } from '../components/organisms/AccessibleMultiStepForm';
import { Article, ContentList, CTABanner, Hero, IconList, LinkList } from '../components/organisms/ContentComponents';
import { AccessibleImage, AudioPlayer, MediaText, VideoPlayer } from '../components/organisms/MediaComponents';
import { ContentBlock, PopupSidebar, SiteFooter, SiteHeader, SiteSidebar } from '../components/organisms/SiteChrome';
import { CaptchaField, LoginForm } from '../components/organisms/VerificationAndLogin';
import {
  AspectRatio,
  Blockquote,
  ButtonWithIcon,
  Card,
  Code,
  Cluster,
  Container,
  Grid,
  IconButton,
  Inset,
  Link,
  LinkWithIcon,
  Quote,
  Separator,
  Spinner,
  Stack,
  ThemeControl,
  ThemeProvider,
} from '../components/atoms/FoundationPrimitives';
import {
  Carousel,
  CheckboxCards,
  ContextMenu,
  DataList,
  Dialog,
  HoverCard,
  Popover,
  RadioCards,
  ScrollArea,
  SegmentedControl,
  Slider,
  Switch,
  TextArea,
} from '../components/molecules/InteractionPrimitives';

const componentGroups = [
  {
    name: 'Atoms',
    items: [
      { id: 'button', name: 'Button', description: 'Triggers an action or submits a form.', variants: ['Primary', 'Secondary', 'Ghost', 'Outline', 'Small, medium, and large sizes'] },
      { id: 'input', name: 'Input', description: 'Collects a single line of text with optional label and validation feedback.', variants: ['Default', 'Error', 'Disabled'] },
      { id: 'checkbox', name: 'Checkbox', description: 'Captures a binary choice using the platform-native checkbox control.', variants: ['Unchecked', 'Checked', 'Disabled'] },
      { id: 'avatar', name: 'Avatar', description: 'Represents a person or account with an image and a readable fallback.', variants: ['Image', 'Initials fallback', 'Decorative or labelled'] },
      { id: 'skip-link', name: 'Skip link', description: 'Lets keyboard users bypass repeated navigation and jump to the main content.', variants: ['Visible on keyboard focus', 'Custom target', 'Custom link text'] },
      { id: 'live-region', name: 'Live region', description: 'Announces changing content to assistive technology without moving focus.', variants: ['Polite announcement', 'Assertive announcement', 'Atomic message'] },
      { id: 'typography', name: 'Typography', description: 'Applies a consistent type scale and semantic HTML to content.', variants: ['Heading 1', 'Heading 2', 'Heading 3', 'Paragraph', 'Inline text'] },
      { id: 'badge', name: 'Badge', description: 'Presents a short status or category label.', variants: ['Default', 'Success', 'Warning', 'Danger'] },
      { id: 'progress', name: 'Progress bar', description: 'Communicates progress as a value from 0 to 100.', variants: ['Primary', 'Success', 'Warning', 'Danger'] },
      { id: 'skeleton', name: 'Skeleton', description: 'Provides a reduced-motion-aware placeholder while content loads.', variants: ['Text', 'Button', 'Input', 'Card'] },
      { id: 'blockquote', name: 'Blockquote', description: 'Marks a longer quotation with native quotation semantics.', variants: ['Citation source', 'Semantic quotation'] },
      { id: 'quote', name: 'Quote', description: 'Marks a short inline quotation with native quotation semantics.', variants: ['Inline quotation', 'Citation source'] },
      { id: 'code', name: 'Code', description: 'Displays short inline code with a distinct monospace style.', variants: ['Inline code', 'Custom styling'] },
      { id: 'link', name: 'Link', description: 'Provides consistent focus and link styling, with safe external-link behavior.', variants: ['Internal link', 'External link with new-tab announcement'] },
      { id: 'icon-button', name: 'Icon button', description: 'Presents a compact icon action with an explicit accessible name.', variants: ['Required accessible label', 'Disabled', 'Custom icon'] },
      { id: 'spinner', name: 'Spinner', description: 'Communicates an ongoing loading state with a readable status label.', variants: ['Custom status label', 'Reduced-motion behavior'] },
      { id: 'separator', name: 'Separator', description: 'Visually separates content with optional semantic separator orientation.', variants: ['Horizontal', 'Vertical', 'Decorative'] },
    ],
  },
  {
    name: 'Molecules',
    items: [
      { id: 'multiselect', name: 'MultiSelect', description: 'Lets users search for and select one or more options.', variants: ['Closed', 'Open and searchable', 'Selected options'] },
      { id: 'toast', name: 'Toast', description: 'Announces a brief status message and optionally dismisses it.', variants: ['Info', 'Success', 'Warning', 'Danger'] },
      { id: 'pagination', name: 'Pagination', description: 'Navigates a large result set and condenses distant page numbers with ellipses.', variants: ['First and last page', 'Previous and next', 'Ellipsis navigation'] },
      { id: 'tabs', name: 'Tabs', description: 'Switches between related panels using the WAI-ARIA tabs pattern.', variants: ['Manual or automatic selection by activation', 'Horizontal arrow-key navigation'] },
      { id: 'accordion', name: 'Accordion', description: 'Expands and collapses related sections of content.', variants: ['Single panel', 'Multiple panels', 'Disabled panel'] },
      { id: 'select', name: 'Select', description: 'Searches and selects one option, including options with supporting detail.', variants: ['Searchable options', 'Custom icon and description', 'No results'] },
      { id: 'date-range', name: 'Date range picker', description: 'Selects a start and end date with calendar and month/year navigation.', variants: ['Partial range', 'Completed range', 'Month and year selection'] },
      { id: 'tooltip', name: 'Tooltip', description: 'Shows supplementary information on keyboard focus or pointer hover.', variants: ['Top placement', 'Bottom placement', 'Viewport-aware positioning'] },
      { id: 'file-uploader', name: 'File uploader', description: 'Validates dragged or selected files and reports each upload’s progress.', variants: ['Drag and drop', 'Type and size validation', 'Per-file progress and errors'] },
      { id: 'form-field', name: 'Form field', description: 'Connects a control to its label, hint, required state, and validation error.', variants: ['Label and hint', 'Required', 'Invalid with linked error'] },
      { id: 'form-error-summary', name: 'Form error summary', description: 'Summarizes validation problems and links each one to its field.', variants: ['One or multiple errors', 'Linked field navigation', 'Empty state hidden'] },
      { id: 'radio-group', name: 'Radio group', description: 'Collects one choice from a small set using native radio controls.', variants: ['Vertical or horizontal layout', 'Descriptions', 'Disabled choices', 'Hint and validation error'] },
      { id: 'combobox', name: 'Combobox', description: 'Filters suggestions as the user types and supports optional free-text values.', variants: ['Filtered suggestions', 'Keyboard selection', 'Async loading and empty states', 'Optional custom value'] },
      { id: 'menu-button', name: 'Menu button', description: 'Opens a keyboard-operable menu of actions.', variants: ['Arrow-key navigation', 'Home and End', 'Escape dismissal and focus return', 'Disabled items'] },
      { id: 'inline-alert', name: 'Inline alert', description: 'Communicates persistent contextual information with appropriate announcement urgency.', variants: ['Info', 'Success', 'Warning', 'Error'] },
      { id: 'breadcrumbs', name: 'Breadcrumbs', description: 'Shows the current page’s location within a navigational hierarchy.', variants: ['Linked ancestors', 'Current page', 'Custom landmark name'] },
      { id: 'stepper', name: 'Stepper', description: 'Communicates completed, current, and upcoming steps in a task.', variants: ['Current step', 'Completed steps', 'Optional completed-step navigation'] },
      { id: 'tree-view', name: 'Tree view', description: 'Navigates a hierarchy of expandable and selectable items.', variants: ['Nested items', 'Expanded and collapsed', 'Roving focus and selection'] },
      { id: 'command-palette', name: 'Command palette', description: 'Searches and runs actions from a keyboard-operable command dialog.', variants: ['Search and filter', 'Arrow-key selection', 'Keyboard shortcut', 'Empty state'] },
      { id: 'avatar-group', name: 'Avatar group', description: 'Shows a set of people with accessible names and a labelled overflow count.', variants: ['Initials fallback', 'Visible item limit', 'Accessible overflow count'] },
      { id: 'language-switcher', name: 'Language switcher', description: 'Lets users choose a locale with either a native select or a menu-button variant.', variants: ['Native select (recommended)', 'Menu button with checked language options', 'BCP 47 locale tags', 'Controlled or uncontrolled selection'] },
      { id: 'textarea', name: 'Text area', description: 'Collects multi-line input with an associated label, hint, and error.', variants: ['Label and hint', 'Required', 'Invalid', 'Disabled'] },
      { id: 'switch', name: 'Switch', description: 'Toggles a setting with an explicit on/off state.', variants: ['Controlled or uncontrolled', 'Disabled', 'Checked state announcement'] },
      { id: 'slider', name: 'Slider', description: 'Adjusts a numeric value using the native range control.', variants: ['Custom min/max/step', 'Controlled or uncontrolled', 'Disabled'] },
      { id: 'radio-cards', name: 'Radio cards', description: 'Presents mutually exclusive native radio choices as selectable cards.', variants: ['Single selection', 'Descriptions', 'Responsive columns', 'Native radio keyboard behavior'] },
      { id: 'checkbox-cards', name: 'Checkbox cards', description: 'Presents independent native checkbox choices as selectable cards.', variants: ['Multiple selection', 'Descriptions', 'Responsive columns', 'Controlled or uncontrolled selection'] },
      { id: 'segmented-control', name: 'Segmented control', description: 'Groups a small mutually exclusive choice set in a compact radio-button layout.', variants: ['Native radio semantics', 'Arrow-key selection', 'Disabled options'] },
      { id: 'context-menu', name: 'Context menu', description: 'Provides contextual actions through pointer or keyboard invocation.', variants: ['Right-click', 'Shift+F10 or context-menu key', 'Arrow keys, Home/End, Escape'] },
      { id: 'data-list', name: 'Data list', description: 'Displays related label/value pairs using definition-list semantics.', variants: ['Text values', 'Rich values', 'Responsive layout'] },
      { id: 'popover', name: 'Popover', description: 'Reveals supplementary interactive content from a trigger.', variants: ['Click to open', 'Escape and outside dismissal', 'Focus management'] },
      { id: 'hover-card', name: 'Hover card', description: 'Shows nonessential supporting information on pointer hover or keyboard focus.', variants: ['Hover and focus', 'Supplementary content'] },
      { id: 'scroll-area', name: 'Scrollable area', description: 'Creates a labelled, keyboard-focusable region for overflow content.', variants: ['Named region', 'Keyboard scrolling', 'Overscroll containment'] },
      { id: 'carousel', name: 'Carousel', description: 'Lets users move manually through a labelled set of slides.', variants: ['Previous and next', 'Live slide announcement', 'No automatic movement'] },
      { id: 'dialog', name: 'Dialog', description: 'Displays a modal task in a labelled dialog with managed focus.', variants: ['Controlled open state', 'Escape dismissal', 'Focus trap and return'] },
    ],
  },
  {
    name: 'Organisms',
    items: [
      { id: 'site-header', name: 'Header', description: 'Provides a reusable site header with brand, primary navigation, and optional actions.', variants: ['In-flow header', 'Fixed header with reserved page space', 'Responsive navigation links'] },
      { id: 'site-sidebar', name: 'Sidebar', description: 'Displays a labelled secondary navigation with an optional current-page link.', variants: ['Named navigation', 'Current-page state', 'Custom title'] },
      { id: 'popup-sidebar', name: 'Popup sidebar', description: 'Opens a navigation sidebar in a modal drawer for compact layouts.', variants: ['Trigger button', 'Focus-managed modal drawer', 'Escape and close button'] },
      { id: 'site-footer', name: 'Footer', description: 'Organizes site identity and navigation using simple, multi-column, or minimal layouts.', variants: ['Simple', 'Multiple link columns', 'Minimal'] },
      { id: 'modal', name: 'Modal', description: 'Displays focused content in a dialog above the current page.', variants: ['Open', 'Closed'] },
      { id: 'data-table', name: 'Data table', description: 'Displays structured data with sorting, filtering, pagination, and resizable sticky columns.', variants: ['Sorting', 'Global filtering', 'Pagination', 'Sticky header', 'Resizable columns'] },
      { id: 'accessible-form', name: 'Accessible form example', description: 'Demonstrates field-level validation, linked error navigation, focus management, and submission feedback.', variants: ['Required fields', 'Error summary focus', 'Correctable errors', 'Success status'] },
      { id: 'multi-step-form', name: 'Multi-step form', description: 'Demonstrates a validated, reviewable workflow with progress and focus management.', variants: ['Contact details', 'Preferences', 'Review and submit', 'Back and completed-step navigation'] },
      { id: 'card', name: 'Card', description: 'Groups related content into a bordered surface.', variants: ['Article, section, or div semantics', 'Optional accessible name', 'Custom content'] },
    ],
  },
  {
    name: 'Content patterns',
    items: [
      { id: 'content-block', name: 'Content block', description: 'Groups a titled content section with optional introduction and visual treatment.', variants: ['Default', 'Muted', 'Accent', 'Bordered'] },
      { id: 'hero', name: 'Hero', description: 'Introduces a page or feature with a clear heading, summary, and optional actions or image.', variants: ['Heading hierarchy', 'Eyebrow and summary', 'One or more actions', 'Optional image with alternative text'] },
      { id: 'content-list', name: 'List', description: 'Presents related information as a semantic ordered or unordered list.', variants: ['Unordered list', 'Ordered list', 'Optional accessible name'] },
      { id: 'article', name: 'Article', description: 'Structures a self-contained piece of content with a heading, optional image, and publication metadata.', variants: ['Eyebrow', 'Author and publication date', 'Image with alternative text and caption', 'Semantic article landmark'] },
      { id: 'link-list', name: 'Link list', description: 'Groups descriptive links in a named navigation landmark.', variants: ['Named navigation', 'Link descriptions', 'Keyboard-accessible links'] },
      { id: 'icon-list', name: 'Icon list', description: 'Pairs decorative icons with visible headings and descriptions in a semantic list.', variants: ['Decorative icons', 'Heading and detail', 'Responsive grid'] },
      { id: 'cta-banner', name: 'CTA banner', description: 'Highlights a next step with a clear heading, supporting text, and prominent links.', variants: ['Primary action', 'Optional secondary action', 'High-contrast text and focus states'] },
      { id: 'image', name: 'Image', description: 'Displays meaningful or decorative imagery with optional visible caption text.', variants: ['Required alt text', 'Decorative image', 'Optional caption', 'Lazy loading by default'] },
      { id: 'video', name: 'Video', description: 'Provides native video playback with caption tracks and an optional transcript link.', variants: ['Accessible player name', 'Caption tracks', 'Transcript link', 'Multiple source formats'] },
      { id: 'audio', name: 'Audio', description: 'Provides native audio playback with an optional transcript link and description.', variants: ['Accessible player name', 'Multiple source formats', 'Transcript link'] },
      { id: 'media-text', name: 'Media and text', description: 'Combines meaningful media with related content in a responsive, configurable layout.', variants: ['Image on either side', 'Required alternative text', 'Configurable heading level'] },
    ],
  },
  {
    name: 'Authentication and verification',
    items: [
      { id: 'captcha', name: 'CAPTCHA field', description: 'Provides an accessible labelled container for a real CAPTCHA provider integration.', variants: ['Provider challenge slot', 'Verification status', 'Hint and error feedback', 'Server-side verification required'] },
      { id: 'login', name: 'Login form', description: 'Collects sign-in credentials with accessible labels, autocomplete, password visibility, and async feedback.', variants: ['Email and password fields', 'Show or hide password', 'Pending submission', 'Error and success feedback'] },
    ],
  },
  {
    name: 'Design system and guides',
    items: [
      { id: 'aspect-ratio', name: 'Aspect ratio', description: 'Maintains a responsive media frame at a specified ratio.', variants: ['16:9 video', 'Square media', 'Custom ratio'] },
      { id: 'inset', name: 'Inset', description: 'Applies consistent internal spacing around content.', variants: ['Configurable spacing', 'Semantic content wrapper'] },
      { id: 'layout-primitives', name: 'Layout primitives', description: 'Composes responsive pages with container, stack, cluster, and grid layouts.', variants: ['Container', 'Stack', 'Cluster', 'Responsive grid'] },
      { id: 'theme-system', name: 'Theme system', description: 'Applies light, dark, or system color preference through shared design tokens.', variants: ['Light', 'Dark', 'System preference', 'Controlled or uncontrolled'] },
      { id: 'styling-guide', name: 'Styling guide', description: 'Documents component styling conventions, focus indicators, and customization boundaries.', variants: ['Design tokens', 'Focus styles', 'Consumer overrides'] },
      { id: 'release-guide', name: 'Release guide', description: 'Describes the project’s change, validation, versioning, and release-note workflow.', variants: ['Change review', 'Validation checklist', 'Version and release notes'] },
    ],
  },
] as const;

type ComponentId = (typeof componentGroups)[number]['items'][number]['id'];

const componentList = componentGroups.flatMap((group) =>
  group.items.map((component) => ({ ...component, group: group.name })),
);

const componentDocumentation: Record<
  ComponentId,
  { usage: string; accessibility: string; keyboard: string; api: string[] }
> = {
  button: {
    usage: 'Use a button to perform an immediate action, such as saving changes, opening a dialog, or submitting a form. Use a link instead when the action navigates to another page or location.',
    accessibility: 'Button text should describe the action (“Save changes”) rather than its appearance (“Blue button”). For icon-only buttons, provide an accessible name with aria-label. Set type="button" for controls inside forms unless submission is intended.',
    keyboard: 'Native button behavior: Tab moves focus to the button; Enter or Space activates it. Disabled buttons cannot be focused or activated.',
    api: ['variant: primary (default), secondary, ghost, or outline', 'size: sm, md (default), or lg', 'children: visible button label or content', 'Native button attributes are forwarded, including type, disabled, and aria-*'],
  },
  input: {
    usage: 'Use Input to collect a single line of user-entered text. Provide a visible label and, when validation fails, a concise error that explains how to correct the value. Use placeholder only as an example, not as the label.',
    accessibility: 'The component associates its label with the input and generates a stable id when one is not supplied. An error sets aria-invalid and connects its message using aria-describedby. Keep errors specific and do not communicate invalidity through color alone.',
    keyboard: 'The underlying native input follows browser conventions. Tab moves focus into the field; arrow keys and text-editing shortcuts retain their standard behavior.',
    api: ['label: optional visible label associated with the field', 'error: optional validation message', 'All standard HTML input props are forwarded, including id, type, name, value, and required'],
  },
  'skip-link': {
    usage: 'Place a skip link at the beginning of the page before repeated navigation. Point it to the page’s primary content landmark, which should have a matching id.',
    accessibility: 'The link is visually hidden until keyboard focus, then displayed clearly. Use a real fragment destination and ensure the target can receive focus, commonly with tabIndex={-1}.',
    keyboard: 'The first Tab stop reveals the link. Enter activates it and moves the user to the target; subsequent Tab navigation continues from that location.',
    api: ['href: fragment target, defaults to #main-content', 'children: visible-on-focus link label, defaults to “Skip to main content”', 'Standard anchor attributes are forwarded'],
  },
  'live-region': {
    usage: 'Mount the region before an update and change its text when new information should be announced without interrupting the current task. Prefer polite announcements; reserve assertive announcements for urgent information.',
    accessibility: 'Uses a visually hidden live region with atomic announcement by default. Polite mode exposes role=status; assertive mode exposes role=alert. Do not place lengthy or frequently changing content here.',
    keyboard: 'A live region does not receive focus or change keyboard order. Assistive technology announces updates according to the selected politeness.',
    api: ['children: current announcement text or content', 'politeness: polite (default) or assertive', 'atomic: announce the complete region when changed (default true)'],
  },
  checkbox: {
    usage: 'Use a checkbox for an independent yes/no choice or for each item in a set where multiple choices are allowed. Use a radio group instead when exactly one option must be selected.',
    accessibility: 'When label is supplied, it is connected to the checkbox using an explicit generated or caller-provided id. Keep label text descriptive and include the expected effect of the choice where needed. Use the native checked, disabled, and required states.',
    keyboard: 'Native checkbox behavior: Tab focuses the checkbox and Space toggles it. The browser and assistive technology announce its name, checked state, and disabled state.',
    api: ['label: optional visible label', 'checked and onChange: control the checkbox state', 'disabled: prevents interaction and communicates the disabled state', 'Standard HTML input attributes are forwarded'],
  },
  avatar: {
    usage: 'Use an avatar to identify a person or account. Provide useful alternative text when the identity matters; use an empty alt value when the avatar is purely decorative alongside an already visible name.',
    accessibility: 'Images use the supplied alternative text. Failed or absent images fall back to initials while retaining a named image role; decorative fallbacks are hidden from assistive technology.',
    keyboard: 'Avatars are non-interactive and do not enter the tab order.',
    api: ['src: optional image URL; initials render when omitted or when loading fails', 'alt: required alternative text; pass an empty string for decorative imagery', 'name: optional name used to generate fallback initials', 'size: sm, md (default), or lg; fallback: optional explicit initials'],
  },
  breadcrumbs: {
    usage: 'Use breadcrumbs to show hierarchy above the page title when users may need to move to a parent location. Keep ancestors as links and display the current page as non-link text.',
    accessibility: 'Uses a named navigation landmark and ordered list. The current page is marked with aria-current="page"; separators are hidden from assistive technology.',
    keyboard: 'Ancestor links use normal browser link navigation and are reached in document order with Tab.',
    api: ['items: ordered array of { label, href? }; the last item is the current page', 'label: accessible navigation name (default: Breadcrumb)', 'className: optional additional styling'],
  },
  stepper: {
    usage: 'Use a stepper to orient users in a multi-step task. Pair it with real validation and navigation controls, preserve entered data when going back, and do not represent optional steps as required.',
    accessibility: 'Steps are exposed in a named navigation landmark. The active step uses aria-current="step"; visible labels and text statuses communicate completed and upcoming states without relying on color.',
    keyboard: 'Completed steps become native buttons when onStepChange is supplied. They can be activated with Enter or Space; current and upcoming steps remain informational.',
    api: ['steps: ordered array of { id, label, description? }', 'currentStep: zero-based active step index', 'onStepChange: optional callback enabled for completed steps only', 'label: accessible navigation landmark name'],
  },
  'tree-view': {
    usage: 'Use a tree for genuinely hierarchical content such as folders or nested categories. For a simple flat list, prefer ordinary list semantics. Keep selection separate from expansion when the workflow requires both.',
    accessibility: 'Implements tree, treeitem, and group roles with level, selected, expanded, and disabled states. Only the active visible item is in the tab sequence.',
    keyboard: 'Arrow Down/Up moves among visible items; Right expands or enters children; Left collapses or moves to the parent; Home/End moves to the first/last visible item; Enter or Space selects.',
    api: ['items: nested array of { id, label, children?, disabled?, icon? }', 'label: required accessible name for the tree', 'selectedId + onSelect: controlled selection; defaultSelectedId for uncontrolled selection', 'defaultExpandedIds: initially expanded branch ids'],
  },
  'command-palette': {
    usage: 'Use a command palette for discoverable actions in an application with a meaningful set of commands. Keep actions searchable by relevant terms and provide concise descriptions when labels need context.',
    accessibility: 'Opens a labelled modal dialog containing a labelled combobox and listbox. The active result is exposed through aria-activedescendant; Escape and action selection restore focus to the trigger.',
    keyboard: 'Use Ctrl/Command+K or the trigger to open. Type to filter; Arrow Down/Up changes the active result; Enter runs it; Escape closes; Tab remains in the search field while the modal is open.',
    api: ['items: { id, label, description?, keywords?, onSelect, disabled? }[]', 'label and placeholder: dialog/search names and prompts', 'triggerLabel: visible trigger text', 'shortcut: key for Ctrl/Command shortcut; defaults to k'],
  },
  'avatar-group': {
    usage: 'Use an avatar group to show a small number of people associated with a record, team, or conversation. Limit visible avatars when space is constrained and communicate the hidden count.',
    accessibility: 'Each meaningful avatar has alternative text; decorative imagery can use empty alt. The overflow indicator is announced as the number of additional people.',
    keyboard: 'Avatar groups are informational and add no keyboard stops.',
    api: ['avatars: array of Avatar props, including alt, src?, and name?', 'max: maximum visible avatar count (defaults to all)', 'label: accessible group/list name', 'size: default avatar size; individual avatar sizes override it'],
  },
  'language-switcher': {
    usage: 'Use a language switcher to let users choose the language or locale for an application. Prefer the native select for compact settings forms and mobile-friendly native pickers. Use the menu-button variant when language selection is part of a site or application header.',
    accessibility: 'The select variant uses a visible label and native semantics. The menu variant exposes a labelled menu button and menuitemradio options with checked state; both expose each option’s language tag and report locale changes without claiming to translate the host application.',
    keyboard: 'Select variant uses native select keyboard behavior. Menu variant opens from its button; Arrow Up/Down moves among choices, Home/End moves to the first/last, Enter or Space selects, Escape closes and restores trigger focus, and Tab closes while continuing normal navigation.',
    api: ['languages: { tag, label }[]; use BCP 47 tags such as en or fr-CA', 'variant: select (default) or menu', 'value + onChange: controlled locale tag; defaultValue for uncontrolled use', 'label: visible field label or menu button name (default: Language)', 'This component reports selection only; the consumer owns translation and locale persistence'],
  },
  typography: {
    usage: 'Use the typography variants to apply the shared type scale. Choose a heading level according to the document outline, not visual size alone. Use paragraph for body copy and span for short inline content.',
    accessibility: 'Heading variants render semantic h1, h2, and h3 elements; paragraph renders p and inline text renders span. Maintain a meaningful heading hierarchy and avoid choosing a heading only for its styling.',
    keyboard: 'Typography is presentational content and does not add keyboard interaction. Interactive elements should use the dedicated interactive components instead.',
    api: ['variant: h1, h2, h3, p (default), or span', 'children: text or inline content', 'className: optional additional styling'],
  },
  badge: {
    usage: 'Use a badge for a brief status or category that supplements nearby content, such as “Draft” or “Complete”. Keep the text concise and ensure the status is understandable without its color.',
    accessibility: 'Badge is rendered as text in a span and does not add an ARIA role. Avoid relying on color alone to distinguish meaning; include a visible status word as the label.',
    keyboard: 'Badge is non-interactive and is not placed in the tab order.',
    api: ['variant: default (default), success, warning, or danger', 'children: short visible status or category label', 'className: optional additional styling'],
  },
  progress: {
    usage: 'Use a progress bar to show measurable completion, such as an upload or multi-step task. Update the value as progress changes; omit progress only for an operation whose completion amount is unknown.',
    accessibility: 'The component exposes role=progressbar and values bounded to 0–100. A supplied label is programmatically associated with the bar; without one it announces “Progress”. Indeterminate progress intentionally omits aria-valuenow. Use valueText for a meaningful spoken value and a separate live region for important completion events.',
    keyboard: 'Progress is informational and does not accept keyboard input. If users can change the value, use a slider or another interactive control instead.',
    api: ['progress: optional numeric completion value, clamped to 0–100; omit for indeterminate progress', 'color: primary (default), success, warning, or danger', 'label: optional visible and accessible name', 'valueText: optional accessible value description such as “3 of 5 files”'],
  },
  skeleton: {
    usage: 'Use a skeleton when content is expected to load shortly and the page layout is known. Match its size to the content it replaces and remove it when the real content is ready. Avoid flashing placeholders for very short waits.',
    accessibility: 'Skeletons are hidden from assistive technology by default so decorative placeholders are not announced as content. Keep a separate status message such as “Loading profile” when users need to know that content is in progress.',
    keyboard: 'Skeletons are non-interactive placeholders and are not focusable.',
    api: ['variant: text (default), button, input, or card', 'lines: number of text placeholder lines', 'className: optional size or layout overrides', 'Respects reduced-motion preferences by disabling pulse animation'],
  },
  multiselect: {
    usage: 'Use MultiSelect when users need to choose from a searchable list of options. Supply each option with a readable label and a stable value. The onChange callback receives the updated array after selection or removal.',
    accessibility: 'The trigger is exposed as a named combobox with expanded state and a relationship to its listbox. Options are keyboard focusable. Check that the accessible name describes what is being selected and that option labels make sense out of context.',
    keyboard: 'Focus the combobox and press Enter, Space, or Arrow Down to open it. Arrow keys move between options; Enter or Space selects; Escape closes the list and returns focus to the combobox. Search accepts text.',
    api: ['options: array of { label, value, multiple? } entries', 'placeholder: trigger text and accessible name (default: “Select options...”)', 'onChange: callback receiving the updated string[] selection', 'Selection is managed internally; use onChange to observe changes'],
  },
  toast: {
    usage: 'Use a toast for brief, non-blocking feedback that does not require the user to resolve a problem before continuing. For important or persistent errors, keep the message in the page as well. Provide onClose to enable dismissal.',
    accessibility: 'Toast uses role=alert so its message is announced when displayed. Make the message concise and meaningful without color. The close button is rendered only when onClose is provided and has an accessible name.',
    keyboard: 'The close button is a native button and can be reached with Tab and activated with Enter or Space. By default the toast calls onClose after 3000 ms; set duration to 0 to disable automatic dismissal.',
    api: ['message: required announcement text', 'type: info (default), success, warning, or danger', 'duration: auto-dismiss delay in milliseconds; 0 disables auto-dismiss', 'onClose: optional callback for auto-dismiss and the close button'],
  },
  pagination: {
    usage: 'Use pagination when a result set is too large to show at once. Keep the current page synchronized with the displayed records and preserve filter/sort context when users change pages.',
    accessibility: 'Pagination is a labelled navigation landmark. Current page buttons use aria-current="page"; previous and next controls disable at the bounds and all numbered controls have explicit accessible names.',
    keyboard: 'All controls are native buttons and are reached in document order using Tab. Enter or Space activates a page choice.',
    api: ['currentPage: 1-based active page', 'totalPages: page count; displays at least one page', 'onPageChange: callback for the requested page', 'siblingCount: optional adjacent page count around the active page'],
  },
  tabs: {
    usage: 'Use tabs for peer panels that share a topic and where users may switch between panels without navigating away. Keep labels concise and place the panel content directly after the tab list.',
    accessibility: 'Implements tablist, tab, and tabpanel roles with selected state, controls/labelledby relationships, and a single tab stop. Disabled tabs are skipped.',
    keyboard: 'Right/Left Arrow moves focus and activates the next/previous enabled tab; Home and End move to the first/last enabled tab. Tab then enters the selected panel.',
    api: ['tabs: array of { id, label, content, disabled? }', 'defaultTabId: initial tab for uncontrolled use', 'activeTabId + onChange: controlled selection', 'ariaLabel: accessible name for the tablist'],
  },
  accordion: {
    usage: 'Use an accordion to let users reveal sections of related content without leaving the page. If most content must be read together, consider showing it without collapsible behavior.',
    accessibility: 'Each section uses a heading containing a button with aria-expanded and aria-controls. The associated content region is labelled by its trigger.',
    keyboard: 'Native buttons support Tab, Enter, and Space. The browser’s standard heading navigation exposes each section title.',
    api: ['items: array of { id, title, content, disabled? }', 'multiple: allow more than one section to remain open', 'defaultOpenIds: initially expanded item ids'],
  },
  select: {
    usage: 'Use Select when exactly one value should be chosen and the option list benefits from search or custom descriptions. For short native menus, a native select may be more efficient.',
    accessibility: 'Provide a visible label. The trigger exposes combobox state; search results are options in a labelled listbox, and empty results are announced as a status message. Include text alongside custom icons.',
    keyboard: 'Open with Enter, Space, or Arrow Down. Search by typing; Arrow keys move through enabled options; Enter selects; Escape closes and returns focus to the trigger.',
    api: ['options: { value, label, description?, icon?, disabled? }[]', 'label: required visible name', 'value + onChange: controlled selection; defaultValue: initial uncontrolled selection', 'placeholder and noResultsText: customizable empty prompts'],
  },
  'radio-group': {
    usage: 'Use radio buttons when users must choose exactly one option from a small, visible set. For long or searchable lists, prefer a native select or an appropriate combobox.',
    accessibility: 'Uses a fieldset and legend to name the group and native radio inputs with a shared name. Hints and errors are associated with the group; each description is associated with its option. Required and disabled semantics use native attributes.',
    keyboard: 'Tab enters and leaves the radio group; arrow keys move and select within the group following browser-native radio behavior. Space selects the focused option.',
    api: ['name and legend: required group name and visible legend', 'options: { value, label, description?, disabled? }[]', 'value + onChange: controlled selection; defaultValue: initial selection', 'hint, error, required, disabled, and orientation customize group behavior'],
  },
  combobox: {
    usage: 'Use a combobox when users benefit from typing to filter suggestions, including results supplied asynchronously. Keep a clear label, announce loading and empty states, and allow free text only when the workflow accepts values beyond listed suggestions.',
    accessibility: 'The labelled text input exposes combobox and list autocomplete semantics. The active suggestion is communicated with aria-activedescendant, and the popup uses a labelled listbox with selected and disabled option states.',
    keyboard: 'Type to filter; Arrow Down/Up opens and moves through enabled suggestions; Enter chooses the active suggestion (or commits non-empty free text when enabled); Escape closes and reverts uncommitted text; Tab leaves the control.',
    api: ['options: { value, label, description?, disabled? }[]; update externally for async results', 'label: required visible name; hint and placeholder are optional', 'value + onChange: controlled choice; defaultValue: initial uncontrolled choice', 'onInputChange: receives each query for async lookup', 'loading, noResultsText, loadingText, and allowCustomValue configure states'],
  },
  'menu-button': {
    usage: 'Use a menu button for a short list of related actions. Use ordinary navigation links for site navigation and avoid menus for simple forms or content.',
    accessibility: 'The trigger exposes menu popup and expanded state. The popup has a named menu and each action is a menuitem. Disabled items remain unavailable, and selection restores focus to the trigger.',
    keyboard: 'Enter, Space, or Arrow Down opens at the first enabled item; Arrow Up opens at the last. Arrow keys move among enabled actions, Home/End move to boundaries, Escape closes and returns focus, and Tab closes the menu while continuing normal page navigation.',
    api: ['label: accessible name and visible trigger text', 'items: { id, label, onSelect, disabled? }[]', 'className: optional wrapper styling'],
  },
  'inline-alert': {
    usage: 'Use an inline alert for persistent feedback associated with the current page or task. Choose the severity based on meaning, provide useful text, and do not rely on color alone.',
    accessibility: 'Info, success, and warning messages use role=status for polite announcements. Error uses role=alert for assertive announcement. Visible text communicates status in addition to styling.',
    keyboard: 'The alert does not alter the tab order. Keep interactive actions inside the alert as normal keyboard-operable links or buttons.',
    api: ['variant: info (default), success, warning, or error', 'children: required message content', 'title: optional visible heading', 'className: optional additional styling'],
  },
  'date-range': {
    usage: 'Use a date range for bounded periods such as a report window or reservation. State whether both endpoints are inclusive, and apply minDate/maxDate when the business rules constrain selection.',
    accessibility: 'The trigger opens a labelled dialog. Month and year have visible-to-assistive-technology labels; each day has a full date name, current-date state, disabled state, and selected-range semantics.',
    keyboard: 'Arrow keys move by day or week; Home/End move to the week boundaries; Page Up/Down changes month and Shift+Page Up/Down changes year. Escape closes the calendar.',
    api: ['label: visible name for the date-range control', 'value + onChange: controlled DateRange; defaultValue for uncontrolled use', 'DateRange has startDate and endDate (null while awaiting an end date)', 'minDate / maxDate: optional inclusive date limits'],
  },
  tooltip: {
    usage: 'Use a tooltip only for short supplementary information that is not essential to complete the task. Do not put interactive controls in a tooltip or use it as the sole label for an input.',
    accessibility: 'The tooltip is associated with its trigger using aria-describedby and uses role=tooltip. Content is shown on keyboard focus as well as pointer hover. A portal and viewport-aware placement prevent ancestor clipping.',
    keyboard: 'Tab to focus the trigger and reveal the tooltip; Escape dismisses it. Moving focus away hides it. Hover is supported for pointer users.',
    api: ['content: required concise explanatory text', 'children: trigger content', 'side: preferred top (default) or bottom; placement flips if space is insufficient', 'className: optional trigger styling'],
  },
  'file-uploader': {
    usage: 'Use the uploader for files users intentionally attach or submit. State allowed formats and size limits before selection, and provide a real upload handler that reports transfer progress.',
    accessibility: 'The file input is labelled; invalid file types and sizes are described in an alert. Each file has its own named progressbar and visible success or failure result. Drag-and-drop has an equivalent keyboard-accessible file picker.',
    keyboard: 'Tab to the file picker label and activate it with Enter or Space to open the system file chooser. The native file input handles keyboard selection.',
    api: ['onUpload: required async handler (file, reportProgress) that performs the upload', 'accept: comma-separated MIME types or extensions', 'multiple and maxFiles: selection count constraints', 'maxFileSize: optional byte limit', 'label, disabled, and className customize the picker'],
  },
  'form-field': {
    usage: 'Wrap a single form control to consistently present its visible label, optional hint, required state, and validation error. Use the same field id in an error summary so users can navigate directly to the control.',
    accessibility: 'The label is programmatically associated with the child control. Hint and error ids are added to aria-describedby without removing existing descriptions; an error also sets aria-invalid. Required fields receive the native required attribute.',
    keyboard: 'The child control retains its native keyboard behavior. Labels are clickable and focus their associated control.',
    api: ['label: required visible label', 'children: one native input, select, textarea, or compatible custom control', 'id: optional control id; generated when omitted', 'hint and error: optional descriptive text connected to the control', 'required: applies the native required state and displays a visible required indicator'],
  },
  'form-error-summary': {
    usage: 'Show the summary after a failed form submission when users need to locate and correct one or more errors. Include a specific field label and actionable correction for each item.',
    accessibility: 'The summary is announced as an alert, has a visible heading, and provides links to the field ids. It can receive programmatic focus after validation; avoid moving focus for errors that appear while users are still typing.',
    keyboard: 'After a failed submission, focus the summary. Tab to an error link and activate it to navigate to the corresponding field. The target control should have a visible focus indicator.',
    api: ['errors: array of { id, label, message }; id must match the related field', 'heading: optional visible summary heading', 'className: optional additional styling', 'Forwarded ref: focus the summary after submit validation'],
  },
  modal: {
    usage: 'Use a modal for a focused task that must be completed or dismissed before returning to the page. Keep its title specific, its content concise, and provide a clear way to close it.',
    accessibility: 'The dialog is labelled by its visible title and sets aria-modal=true. On open it remembers the previously focused element, moves focus inside, and restores focus when it closes. Background scroll is restored to its prior value.',
    keyboard: 'Escape closes the dialog. Tab and Shift+Tab stay within the dialog; when focus reaches either end it wraps to the other. The close control is a native button.',
    api: ['isOpen: controls whether the dialog is rendered', 'onClose: called on Escape and close-button activation', 'title: required visible dialog title and accessible name', 'children: dialog content', 'className: optional additional dialog styling'],
  },
  'data-table': {
    usage: 'Use a data table for structured records where relationships between columns matter. Provide a stable row id, label the table with a caption, and keep the page size appropriate for the workflow.',
    accessibility: 'Uses native table, caption, header, and cell semantics. Sortable headers expose aria-sort; column resizing controls have separator roles, minimum sizes, and keyboard adjustment. Sticky headers remain visible while the table scrolls.',
    keyboard: 'Sort headers and filter input are keyboard operable. Focus a column separator and use Left/Right Arrow to resize. Pagination buttons use Tab, Enter, or Space.',
    api: ['columns: typed column definitions with id, header, accessor, render?, sortable?, filterable?, width?, minWidth?', 'data: records to display; getRowId: stable unique row id resolver', 'pageSize: rows per page (default 10)', 'caption: required accessible table description', 'Filtering searches filterable displayed values; sorting supports numeric and locale-aware text values'],
  },
  'accessible-form': {
    usage: 'Use the example as a starting point for a form that validates after submit, explains each issue inline and in a summary, and confirms successful completion.',
    accessibility: 'The form uses visible labels, hints, native required semantics, inline error descriptions, a linked alert summary, focus on the summary after invalid submission, and a status message on success.',
    keyboard: 'Tab through the form controls and submit with Enter or the submit button. Invalid submission moves focus to the summary; activate an error link to jump to its field, correct the value, and resubmit.',
    api: ['Demonstration organism composed from FormField and FormErrorSummary', 'Replace the example validation and success handler with application-specific rules and submission logic'],
  },
  'multi-step-form': {
    usage: 'Use a multi-step form when a task has distinct stages or needs a review step. Keep users’ entries when moving backward, validate before advancing, and clearly summarize the submission outcome.',
    accessibility: 'The example pairs a named Stepper with a heading for each stage. It moves focus to the new step heading after navigation, announces validation errors, preserves entered values, and offers a review before submission.',
    keyboard: 'All fields and actions use native keyboard behavior. Continue validates the current step; Back returns to the prior step; completed steps can be revisited; navigation focuses the new step heading.',
    api: ['Demonstration organism composed from Stepper, FormField, RadioGroup, Button, and InlineAlert', 'Replace in-memory validation/submission with the application’s actual data handling'],
  },
  hero: {
    usage: 'Use a hero at the start of a page or feature to orient users with a concise heading and summary. Keep the heading level in sequence with the surrounding page, and limit actions to the most useful next steps.',
    accessibility: 'The section is labelled by its heading. Heading level is configurable so it can fit the page outline. Images require alt text; use an empty alt value only when the image is decorative. Actions are links because they navigate.',
    keyboard: 'Actions are native links reached in document order with Tab and activated with Enter. The component adds no custom keyboard behavior.',
    api: ['title: required heading text; headingLevel: h1 (default), h2, or h3', 'description and eyebrow: optional supporting content', 'actions: optional { label, href }[] rendered as links', 'image: optional { src, alt } object; alt is required', 'className: optional section styling'],
  },
  'content-list': {
    usage: 'Use a list for a group of related items. Choose ordered when sequence matters and unordered when it does not. Do not simulate list structure with manually typed bullet characters.',
    accessibility: 'Renders native ol or ul and li semantics. Each item has a stable id; an optional label names the list when its purpose is not clear from the surrounding heading.',
    keyboard: 'Informational lists add no keyboard stops. Interactive descendants retain their native keyboard behavior.',
    api: ['items: { id, content }[]', 'ordered: render ol instead of ul (default false)', 'label: optional accessible list name', 'className: optional list styling'],
  },
  article: {
    usage: 'Use Article for a self-contained composition that could stand alone or be distributed independently, such as a news story or documentation entry. Use heading levels that follow the page outline.',
    accessibility: 'Uses article and header semantics with a configurable heading level. Optional imagery is rendered as a figure with required alternative text and optional caption. Publication dates use time with a machine-readable dateTime value; author and date are visible text.',
    keyboard: 'Article content is read in document order. Links or controls inside children use their standard keyboard behavior.',
    api: ['title and children: required heading and article content', 'image: optional { src, alt, caption? } figure before the article header', 'eyebrow and author: optional visible context', 'published: optional { dateTime, label } metadata', 'headingLevel: h2 (default), h3, or h4'],
  },
  'link-list': {
    usage: 'Use LinkList to group navigation destinations, such as related resources or section links. Give each link a concise label that makes sense out of context and include a description only when it adds useful detail.',
    accessibility: 'Renders a named navigation landmark containing a native list of links. Each visible link label is the accessible name and its optional supporting text is associated as the accessible description. Provide a distinct label when a page has multiple navigation landmarks.',
    keyboard: 'Links are reached in document order with Tab and activated with Enter. Browser link behavior is preserved.',
    api: ['label: required accessible name for the navigation landmark', 'links: { href, label, description? }[]; description is supplementary accessible description', 'className: optional navigation styling'],
  },
  'icon-list': {
    usage: 'Use IconList to make a short set of features or benefits scannable. Pair every icon with a visible heading and optional description; the meaning must remain clear if icons are not perceived.',
    accessibility: 'Uses native list semantics. Icons are hidden from assistive technology because adjacent visible text conveys each item. Headings and descriptions carry the meaning.',
    keyboard: 'Informational items add no keyboard stops. Links or controls added within descriptions retain native behavior.',
    api: ['items: { id, icon, title, description? }[]', 'headingLevel: h3 (default), h2, or h4 for the item titles', 'icon: decorative React content; do not put essential information only in the icon', 'className: optional list styling'],
  },
  'cta-banner': {
    usage: 'Use a call-to-action banner to highlight a relevant next step near related content. Describe the destination in the action label and do not use a banner to interrupt or obscure the task.',
    accessibility: 'Uses a labelled section with a visible heading and text-labelled navigation links. High contrast and visible keyboard focus indicators are provided; ensure custom styles preserve them.',
    keyboard: 'Action links are reached in document order with Tab and activated with Enter.',
    api: ['title: required banner heading; headingLevel: h2 (default), h3, or h4', 'description: optional supporting content', 'action: required { label, href } primary link', 'secondaryAction: optional { label, href } secondary link', 'className: optional section styling'],
  },
  image: {
    usage: 'Use an image to convey content or support nearby text. Write concise alternative text describing the image’s purpose in context; use alt="" only when it is decorative. Add a caption when visible context or attribution is useful.',
    accessibility: 'The alt prop is required at the type level, and the image is wrapped in figure/figcaption semantics when a caption is supplied. Images lazy-load by default; provide explicit dimensions or aspect-ratio styling when layout shift matters.',
    keyboard: 'Images are not interactive and do not add keyboard stops. If the image links somewhere, wrap it in a link with an accessible name for the destination.',
    api: ['src and alt: required image source and alternative text; use alt="" only for decorative images', 'caption: optional visible figcaption content', 'Standard img attributes such as width, height, loading, and decoding are supported', 'className: optional image styling'],
  },
  video: {
    usage: 'Use VideoPlayer for self-paced playback with native controls. Provide captions for dialogue and meaningful sounds; provide audio description when essential visual information is not otherwise conveyed. Offer a transcript for longer or information-dense media.',
    accessibility: 'The native video element has controls and a required accessible label. Caption tracks use kind=captions with language labels. The component does not generate captions; the consumer must supply accurate track files and a transcript where appropriate.',
    keyboard: 'Native browser media controls support keyboard operation; exact shortcuts vary by browser and platform. Tab to reach the player controls and use the browser’s documented keys.',
    api: ['label: required accessible name for the player', 'sources: { src, type? }[]', 'captions: optional { src, label, srcLang, default? }[] caption tracks', 'transcriptHref and transcriptLabel: optional transcript link', 'description: optional visible figure caption; native video attributes are forwarded'],
  },
  audio: {
    usage: 'Use AudioPlayer for spoken or other audio that users should control. Provide a transcript for speech and meaningful audio, especially when the recording contains information users need to complete a task.',
    accessibility: 'The native audio element has controls and a required accessible label. The optional description is a visible figcaption; the optional transcript link provides an alternative to listening.',
    keyboard: 'Native browser media controls support keyboard operation; exact shortcuts vary by browser and platform. Tab to reach the player controls and use the browser’s documented keys.',
    api: ['label: required accessible name for the player', 'sources: { src, type? }[]', 'transcriptHref and transcriptLabel: optional transcript link', 'description: optional visible description shown before the player; native audio attributes are forwarded'],
  },
  'media-text': {
    usage: 'Use MediaText for a related image and text pair, such as a feature explanation or editorial callout. Keep the text understandable without seeing the image and change the image position only when it supports the reading flow.',
    accessibility: 'The section is labelled by its configurable heading. The image uses required alt text and can have a caption. Reading order remains image then text in the DOM even when the visual layout changes.',
    keyboard: 'Informational content adds no keyboard stops. Links or controls in the text remain in normal document order.',
    api: ['title, image ({ src, alt, caption? }), and children: required content', 'headingLevel: h2 (default), h3, or h4', 'imageSide: start (default) or end; visual order changes without changing DOM reading order', 'className: optional layout styling'],
  },
  captcha: {
    usage: 'Use CaptchaField only as a labelled integration slot for a real CAPTCHA service. Mount the provider’s accessible challenge and verify its response on your server; a client-side checkbox or a boolean alone is not a security check. Provide an alternative verification path when possible.',
    accessibility: 'The fieldset and legend provide a group name; hint and error text are associated with the group, and verification status is announced politely. The CAPTCHA provider remains responsible for its challenge semantics and accessible alternatives.',
    keyboard: 'Keyboard interaction depends on the configured provider challenge. Verify its keyboard and screen-reader support with the provider’s current accessibility documentation and offer a usable alternative if it is inaccessible.',
    api: ['challenge: required provider-rendered React content; never substitute a fake checkbox', 'verified: provider-derived current completion state for user feedback only', 'label: optional fieldset legend; hint and error: optional supporting text', 'Always validate provider tokens server-side; this wrapper does not authenticate a user'],
  },
  login: {
    usage: 'Use LoginForm to collect sign-in credentials and delegate authentication to the application. Connect the callback to a secure authentication service, use HTTPS, protect against abuse, and never log or persist plaintext passwords.',
    accessibility: 'Visible labels are associated with required email and password inputs; autocomplete tokens support password managers. The password visibility toggle reports its pressed state. Submission feedback is exposed as status or alert text.',
    keyboard: 'Native form fields follow browser behavior; Tab moves among fields, the visibility button, and submit. Enter submits valid fields. The submit control is disabled while the callback is pending.',
    api: ['onSubmit: required callback receiving { email, password }; use a secure authentication flow', 'title and submitLabel: visible form title and action text', 'error: optional externally supplied authentication error', 'The component clears the password after successful callback completion and shows generic failure text if the callback rejects'],
  },
  blockquote: {
    usage: 'Use Blockquote for a substantial quotation from another source. Keep the source attribution adjacent, and do not use blockquote merely to indent ordinary content.',
    accessibility: 'Renders the native blockquote element. The cite prop is source metadata; display attribution as readable text because cite itself is not generally announced.',
    keyboard: 'Non-interactive text; embedded links use normal keyboard behavior.',
    api: ['children: quoted block content', 'cite: optional source URI metadata', 'className and standard blockquote attributes are supported'],
  },
  quote: {
    usage: 'Use Quote for a short inline quotation within a sentence. Use quotation marks in the content only when required by the writing style; browsers provide native quote semantics.',
    accessibility: 'Renders the native q element. The cite prop provides source metadata; include visible attribution where users need to know the source.',
    keyboard: 'Non-interactive inline text.',
    api: ['children: quoted inline text', 'cite: optional source URI metadata', 'className and standard q attributes are supported'],
  },
  code: {
    usage: 'Use Code for a short code fragment within prose. For multiline examples, pair pre with code so whitespace and block semantics remain clear.',
    accessibility: 'Uses the native code element and does not create an unnecessary landmark or keyboard stop.',
    keyboard: 'Non-interactive text.',
    api: ['children: inline code content', 'className and standard code attributes are supported'],
  },
  link: {
    usage: 'Use Link for navigation. Use a button for an action that changes application state. Make link text describe its destination and avoid “click here”.',
    accessibility: 'Renders a native anchor with a visible focus indicator. external adds target=_blank, safe rel values, and hidden text explaining the new-tab behavior.',
    keyboard: 'Native link behavior: Tab focuses; Enter follows the destination.',
    api: ['href: required destination', 'external: optionally open in a new tab with safe rel and an announcement', 'children: descriptive link text', 'Standard anchor attributes are supported'],
  },
  'icon-button': {
    usage: 'Use IconButton for a compact action whose meaning is clear from a concise accessible name. Prefer visible text labels when space permits.',
    accessibility: 'The required label is applied as aria-label and title. The icon is hidden from assistive technology; disabled state and native button semantics are preserved.',
    keyboard: 'Native button behavior: Tab focuses; Enter or Space activates.',
    api: ['label: required action name', 'icon: decorative icon content', 'Native button attributes are forwarded'],
  },
  spinner: {
    usage: 'Use Spinner only while an operation is actively running. Pair it with a concise status such as “Saving changes”; do not make animation the only signal.',
    accessibility: 'The visible status text is exposed with role=status. The graphic is decorative and animation stops under reduced-motion preferences.',
    keyboard: 'Informational status; no keyboard interaction.',
    api: ['label: visible status text (default “Loading”)', 'className: optional styling'],
  },
  separator: {
    usage: 'Use Separator when a visual or semantic boundary clarifies groups of content. Use headings and landmarks for meaningful sections rather than relying on a separator alone.',
    accessibility: 'A non-decorative separator has role=separator and horizontal/vertical orientation. Decorative separators are hidden from the accessibility tree.',
    keyboard: 'No keyboard interaction.',
    api: ['orientation: horizontal (default) or vertical', 'decorative: omit separator semantics when purely visual', 'className: optional styling'],
  },
  textarea: {
    usage: 'Use TextArea for user-entered multi-line text. Provide a visible label and a useful hint for length or format; do not use placeholder text as the only label.',
    accessibility: 'Associates its visible label, hint, and error with a native textarea. Errors set aria-invalid and join aria-describedby.',
    keyboard: 'Native textarea keyboard and text editing behavior is preserved.',
    api: ['label: required visible label', 'hint and error: optional associated messages', 'Standard textarea props including value, rows, required, and disabled are supported'],
  },
  switch: {
    usage: 'Use Switch for an immediate binary setting change. Phrase its label as the setting, not the result, and use a checkbox when changes should be staged for form submission.',
    accessibility: 'Exposes role=switch with aria-checked and a visible text label. Native button keyboard semantics are retained.',
    keyboard: 'Tab focuses; Space or Enter toggles. Disabled switches cannot be activated.',
    api: ['label: required visible name', 'checked + onChange: controlled; defaultChecked: uncontrolled initial state', 'disabled and className: optional state and styling'],
  },
  slider: {
    usage: 'Use Slider when a numeric value is best adjusted across a bounded range. Provide meaningful min/max/step values and consider a number input for precise entry.',
    accessibility: 'Uses a native range input with an associated label, current output, and native min/max/step state.',
    keyboard: 'Native range keys adjust the value; browser behavior may include arrow, Page Up/Down, Home, and End.',
    api: ['label: required visible name', 'min, max, step: numeric range constraints', 'value + onChange: controlled; defaultValue: uncontrolled'],
  },
  'radio-cards': {
    usage: 'Use RadioCards for one choice among a small set when descriptions help compare alternatives. They remain native radio controls inside a fieldset.',
    accessibility: 'Uses a fieldset/legend and native radios sharing one name. Card appearance does not replace checked semantics or visible focus.',
    keyboard: 'Native radio-group arrow navigation and Space selection are preserved.',
    api: ['options: { value, label, description?, disabled? }[]', 'name and legend: required group identity', 'value/defaultValue and onChange: controlled/uncontrolled selection', 'columns: responsive card layout count'],
  },
  'checkbox-cards': {
    usage: 'Use CheckboxCards when users may choose several independent options and need supporting detail to compare them.',
    accessibility: 'Uses a fieldset/legend and native checkboxes; each option retains its own checked and disabled state. The entire card label is clickable.',
    keyboard: 'Tab reaches each checkbox; Space toggles the focused choice.',
    api: ['options: { value, label, description?, disabled? }[]', 'name and legend: required group identity', 'value/defaultValue and onChange: selected string[]', 'columns, hint, error, disabled: optional layout and validation'],
  },
  'segmented-control': {
    usage: 'Use SegmentedControl for a compact set of two to five mutually exclusive options. Use a select or radio-card layout for larger choices or long descriptions.',
    accessibility: 'Built on a labelled fieldset and native radio inputs. Visual styling does not override the selected or disabled states.',
    keyboard: 'Follows native radio-group arrow-key selection and Tab navigation.',
    api: ['label: visible group name', 'options: { value, label, disabled? }[]', 'value/defaultValue and onChange: controlled/uncontrolled single selection'],
  },
  'context-menu': {
    usage: 'Use ContextMenu for a short set of actions relevant to a particular content area. Keep equivalent actions discoverable elsewhere; do not make right-click the only way to complete a task.',
    accessibility: 'Supports pointer contextmenu and keyboard Shift+F10/context-menu-key invocation. The popup uses menu/menuitem semantics, focusable enabled items, and focus return on Escape or action.',
    keyboard: 'Shift+F10 or the Context Menu key opens. Arrow keys navigate, Home/End move to boundaries, Enter/Space activate, Escape closes and returns focus, and Tab closes without trapping navigation.',
    api: ['label: accessible name for the action menu', 'items: { id, label, onSelect, disabled? }[]', 'children: contextual trigger region', 'className: optional wrapper styling'],
  },
  'data-list': {
    usage: 'Use DataList for short label/value details such as metadata or a summary. Use a table for comparable repeated records with rows and columns.',
    accessibility: 'Uses native dl, dt, and dd relationships; values may contain text or rich content.',
    keyboard: 'Informational data adds no keyboard stops; interactive values retain native behavior.',
    api: ['items: { label, value }[]', 'label and value accept React content', 'className: optional styling'],
  },
  dialog: {
    usage: 'Use Dialog for a brief modal task that needs focus until completed or dismissed. For non-modal supporting content use Popover instead.',
    accessibility: 'Delegates to the existing Modal focus trap and labelled dialog implementation. Escape and close actions invoke onOpenChange(false), and focus returns to the opener.',
    keyboard: 'Tab/Shift+Tab remain within the open dialog; Escape closes; focus is restored to the element that opened it.',
    api: ['open: controlled visibility', 'onOpenChange: receives the next open state', 'title: visible accessible dialog name', 'children and className: dialog content and styling'],
  },
  popover: {
    usage: 'Use Popover for supplementary interactive content that is anchored to a control and can be dismissed without a full-screen modal.',
    accessibility: 'Trigger announces a dialog popup and expanded state; the panel has a name and focuses its first focusable descendant when opened.',
    keyboard: 'Activate the trigger to toggle; Escape closes and restores trigger focus; clicking outside closes the panel.',
    api: ['label: accessible panel name', 'trigger: visible trigger content', 'children: panel content', 'className: optional wrapper styling'],
  },
  'hover-card': {
    usage: 'Use HoverCard only for supplementary preview details, not for required instructions or the only route to an action. Ensure its trigger is focusable in the consuming interface.',
    accessibility: 'Content appears on pointer hover and keyboard focus. Keep its contents short and non-interactive; use a popover for interactive panels.',
    keyboard: 'Focus the trigger to reveal content; moving focus away hides it.',
    api: ['trigger: text or a focusable trigger element', 'children: supplementary non-interactive content', 'className: optional wrapper styling'],
  },
  'scroll-area': {
    usage: 'Use ScrollArea only when a bounded region is necessary. Avoid nested scrolling where possible and make sure users can find all content at small viewport sizes.',
    accessibility: 'Creates a named, focusable region so keyboard users can scroll it independently. Native overflow behavior and browser scrollbars remain available.',
    keyboard: 'Focus the region and use browser scrolling keys such as arrow keys, Page Up/Down, Home, and End.',
    api: ['label: required accessible region name', 'children: overflow content', 'maxHeight: CSS maximum height (default 20rem)', 'className: optional styling'],
  },
  carousel: {
    usage: 'Use Carousel for a related set of slides when showing one item at a time is useful. This implementation does not auto-advance; retain explicit controls and avoid moving content unexpectedly.',
    accessibility: 'Provides a named carousel region, labelled slide position, previous/next button names, and polite announcement of slide content changes.',
    keyboard: 'Tab to Previous/Next and activate with Enter or Space. No custom arrow-key behavior or autoplay is added.',
    api: ['label: required carousel name', 'slides: ordered React content array', 'No auto-rotation; navigation wraps between first and last slides'],
  },
  'aspect-ratio': {
    usage: 'Use AspectRatio around media that should preserve a stable shape while responsive. Select a ratio appropriate to the content and avoid cropping essential information.',
    accessibility: 'Adds no role; children retain their own semantics. Ensure embedded media remains keyboard operable and has its own accessible name.',
    keyboard: 'No custom keyboard interaction.',
    api: ['ratio: width/height number, default 16/9', 'children: media or other content', 'className and standard div attributes are supported'],
  },
  card: {
    usage: 'Use Card to group related content, not as a substitute for semantic section headings. Avoid making a whole card clickable when it contains multiple independent actions.',
    accessibility: 'Renders article by default, with optional section or div semantics and an optional accessible label. Children should provide a meaningful heading hierarchy.',
    keyboard: 'Card itself is not focusable; interactive descendants retain their normal behavior.',
    api: ['as: article (default), section, or div', 'title or aria-label: optional accessible name', 'children: card content', 'className and native element attributes are supported'],
  },
  inset: {
    usage: 'Use Inset to apply consistent inner spacing without adding unnecessary semantic landmarks.',
    accessibility: 'Renders a plain div and does not change child semantics.',
    keyboard: 'No custom keyboard behavior.',
    api: ['space: spacing scale unit in quarter-rem increments (default 4)', 'children and standard div attributes'],
  },
  'layout-primitives': {
    usage: 'Use Container, Stack, Cluster, and Grid to express layout intent consistently. Keep DOM order aligned with reading and keyboard order; use visual reordering sparingly.',
    accessibility: 'Layout helpers render semantic-neutral divs by default. Container can opt into main, section, article, header, or footer; choose landmarks deliberately and provide names when multiple landmarks share a role.',
    keyboard: 'Layout primitives add no keyboard behavior.',
    api: ['Container: responsive max-width and horizontal padding; optional semantic element', 'Stack: vertical flow with spacing', 'Cluster: wrapping horizontal flow with spacing', 'Grid: responsive auto-fit grid with configurable minimum item width'],
  },
  'theme-system': {
    usage: 'Wrap the application with ThemeProvider to honor user preference or set a controlled light/dark/system theme. Use tokens rather than hard-coded colors for theme-aware content.',
    accessibility: 'The provider updates the document color-scheme and data-theme attribute; system mode tracks prefers-color-scheme changes. Ensure custom components retain contrast and visible focus in both themes.',
    keyboard: 'ThemeControl is a labelled native select and follows platform keyboard behavior.',
    api: ['ThemeProvider: defaultTheme or controlled theme: light, dark, or system', 'onThemeChange: receives user-requested theme changes', 'useTheme: returns theme, resolvedTheme, and setTheme; throws if used outside the provider', 'ThemeControl: labelled selector for all three modes'],
  },
  'styling-guide': {
    usage: 'Prefer semantic component APIs and theme tokens; use className for local layout adjustments. Avoid overriding focus, contrast, disabled, and reduced-motion styles without equivalent accessible replacements.',
    accessibility: 'Review contrast in light and dark themes, keyboard focus visibility, forced-colors/high-contrast modes, zoom, and reduced motion. Styling alone cannot establish WCAG conformance.',
    keyboard: 'Keep focus indicators visible and ensure custom pointer affordances have equivalent keyboard behavior.',
    api: ['Use src/index.css CSS custom properties and src/theme tokens as the shared design foundation', 'Pass className for documented local styling hooks', 'Do not rely on color alone for state or meaning', 'Validate overrides with keyboard, zoom, contrast, and assistive-technology testing'],
  },
  'release-guide': {
    usage: 'Use the release checklist before distributing a version. This repository does not currently automate package publishing; verify package metadata, public exports, changelog, and CI before enabling publication.',
    accessibility: 'Include accessibility-impacting behavior and known limitations in release notes. Do not present automated tests as a WCAG certification.',
    keyboard: 'For every interactive change, include keyboard regression tests and manual keyboard QA in the release checklist.',
    api: ['Review the diff and document breaking changes', 'Run pnpm typecheck, pnpm test, pnpm build, and pnpm build-storybook', 'Review keyboard and screen-reader behavior for changed controls', 'Update README.md and A11y.md; use semantic versioning and a dated changelog entry', 'Tag and publish only after repository ownership, package name, and CI credentials are configured'],
  },
  'site-header': {
    usage: 'Use SiteHeader for the shared site identity and primary navigation. Choose the fixed position only when persistent navigation is useful, and keep the link count manageable.',
    accessibility: 'The header contains a home link and a named navigation landmark. Links have visible focus and remain native anchors; fixed mode reserves space in document flow so page content is not covered.',
    keyboard: 'Tab through the brand link, navigation links, and optional actions in DOM order.',
    api: ['brand and homeHref: visible identity and destination', 'links: ordered { label, href } navigation items', 'actions: optional React content such as a button', 'position: static (default) or fixed', 'label: navigation landmark name; className: additional header styling'],
  },
  'site-sidebar': {
    usage: 'Use SiteSidebar for related secondary destinations, such as section navigation. Keep it in logical reading order and use current=true for the active destination.',
    accessibility: 'Renders a labelled navigation landmark with native links; the current item is marked with aria-current="page".',
    keyboard: 'Tab through links in their visual and document order.',
    api: ['label: required navigation landmark name', 'items: { label, href, current? }[]', 'title: optional visible heading associated with the navigation', 'className: additional styling'],
  },
  'popup-sidebar': {
    usage: 'Use PopupSidebar when navigation must be available in a compact modal drawer. Prefer an always-visible sidebar on wide screens when space allows.',
    accessibility: 'Reuses Modal for dialog semantics, focus containment and return, body scroll locking, and Escape dismissal. The navigation inside remains a named landmark with native links.',
    keyboard: 'Activate the trigger to open; Tab stays within the drawer; Escape or Close dismisses it and restores focus to the trigger.',
    api: ['label and items: same navigation props as SiteSidebar', 'triggerLabel: visible opener text', 'dialogTitle: accessible modal title (defaults to title or label)', 'title and className: optional navigation heading and styling'],
  },
  'site-footer': {
    usage: 'Choose simple for a compact brand-and-links footer, columns for grouped destination lists, or minimal for a single-line closing strip.',
    accessibility: 'Uses a footer landmark, labelled navigation for link groups, headings for column groups, and native descriptive links.',
    keyboard: 'Tab through footer links in DOM order.',
    api: ['variant: simple (default), columns, or minimal', 'brand, description, copyright: optional footer content', 'links: simple/minimal links; columns: { heading, links }[] for grouped links', 'className: additional styling'],
  },
  'content-block': {
    usage: 'Use ContentBlock to group related page content beneath a heading. Pick a heading level that fits the surrounding document outline.',
    accessibility: 'Renders a labelled section using its visible heading; children retain their native semantics and reading order.',
    keyboard: 'No custom keyboard behavior; interactive descendants keep native behavior.',
    api: ['title and children: required heading and section content', 'description: optional introductory text', 'headingLevel: h2 (default), h3, or h4', 'variant: default, muted, accent, or bordered', 'className: additional styling'],
  },
};

function ComponentPreview({ id }: { id: ComponentId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [currentPage, setCurrentPage] = useState(3);
  const [toast, setToast] = useState<{ type: 'info' | 'success' | 'warning' | 'danger'; message: string } | null>(null);
  const [menuMessage, setMenuMessage] = useState('No menu action selected yet.');
  const [liveMessage, setLiveMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [commandMessage, setCommandMessage] = useState('No command selected yet.');
  const [loginMessage, setLoginMessage] = useState('This local example does not send credentials to a server.');
  const [demoProgress, setDemoProgress] = useState(35);
  const [switchEnabled, setSwitchEnabled] = useState(true);
  const [sliderValue, setSliderValue] = useState(50);
  const [radioCardValue, setRadioCardValue] = useState('standard');
  const [segmentsValue, setSegmentsValue] = useState('month');
  const [dialogOpen, setDialogOpen] = useState(false);

  switch (id) {
    case 'button':
      return (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      );
    case 'input':
      return (
        <div className="grid max-w-3xl gap-5 md:grid-cols-2">
          <Input label="Full name" placeholder="Enter your name" />
          <Input label="Email address" placeholder="name@example.com" error="Enter a valid email address." />
          <Input label="Read-only example" value="This field is disabled" disabled readOnly />
        </div>
      );
    case 'checkbox':
      return (
        <div className="space-y-4">
          <Checkbox label="Receive product updates" checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} />
          <Checkbox label="Disabled option" checked disabled />
        </div>
      );
    case 'avatar':
      return (
        <div className="flex items-center gap-5">
          <Avatar alt="Jordan Lee" name="Jordan Lee" />
          <Avatar alt="Avery Chen" name="Avery Chen" src="/missing-avatar.png" size="lg" />
          <Avatar alt="" name="Decorative user avatar" />
        </div>
      );
    case 'skip-link':
      return (
        <div className="relative min-h-24 rounded border border-dashed border-slate-300 p-5">
          <SkipLink href="#skip-link-demo-target">Skip to the example content</SkipLink>
          <p className="text-sm text-slate-600">Tab into this preview to reveal the skip link.</p>
          <p id="skip-link-demo-target" tabIndex={-1} className="mt-4 rounded bg-slate-100 p-3 focus:outline-2 focus:outline-blue-700">
            Main content target
          </p>
        </div>
      );
    case 'live-region':
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setLiveMessage(`Saved at ${new Date().toLocaleTimeString()}`)}>Announce save</Button>
            <Button variant="outline" onClick={() => setLiveMessage('')}>Clear message</Button>
          </div>
          <p className="text-sm text-slate-600">Announcement: {liveMessage || 'No current announcement'}</p>
          <LiveRegion>{liveMessage}</LiveRegion>
        </div>
      );
    case 'typography':
      return (
        <div className="space-y-3">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="p">Paragraph text uses the standard body style for readable content.</Typography>
          <Typography variant="span">Inline text</Typography>
        </div>
      );
    case 'badge':
      return (
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      );
    case 'progress':
      return (
        <div className="w-full max-w-xl space-y-5">
          <ProgressBar progress={demoProgress} label="Upload progress" valueText={`${demoProgress}% complete`} />
          <Slider label="Update upload progress" value={demoProgress} onChange={setDemoProgress} />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDemoProgress(0)}>Reset progress</Button>
            <Button onClick={() => setDemoProgress((current) => Math.min(100, current + 10))}>Advance by 10%</Button>
          </div>
          <p role="status" aria-live="polite" className="text-sm text-slate-700">
            {demoProgress === 100 ? 'Upload complete.' : `Upload is ${demoProgress}% complete.`}
          </p>
          <ProgressBar label="Preparing upload" />
        </div>
      );
    case 'skeleton':
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <div><p className="mb-2 text-sm text-slate-600">Button</p><Skeleton variant="button" /></div>
          <div><p className="mb-2 text-sm text-slate-600">Input</p><Skeleton variant="input" /></div>
          <div><p className="mb-2 text-sm text-slate-600">Card</p><Skeleton variant="card" /></div>
          <div><p className="mb-2 text-sm text-slate-600">Text</p><Skeleton lines={3} /></div>
        </div>
      );
    case 'multiselect':
      return (
        <div className="max-w-md">
          <MultiSelect
            options={[
              { label: 'React', value: 'react' },
              { label: 'Vue', value: 'vue' },
              { label: 'Svelte', value: 'svelte' },
              { label: 'Angular', value: 'angular' },
            ]}
            placeholder="Choose frameworks..."
          />
          <p className="mt-3 text-sm text-gray-600">Open the selector to search, then select an option.</p>
        </div>
      );
    case 'toast':
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {(['info', 'success', 'warning', 'danger'] as const).map((type) => (
              <Button
                key={type}
                variant="outline"
                onClick={() => setToast({ type, message: `${type[0].toUpperCase()}${type.slice(1)} message example` })}
              >
                Show {type}
              </Button>
            ))}
          </div>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              duration={0}
              onClose={() => setToast(null)}
              style={{ position: 'static' }}
            />
          )}
        </div>
      );
    case 'pagination':
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Choose a page to update this example.</p>
          <Pagination currentPage={currentPage} totalPages={12} onPageChange={setCurrentPage} />
        </div>
      );
    case 'tabs':
      return (
        <Tabs
          ariaLabel="Account sections"
          tabs={[
            { id: 'profile', label: 'Profile', content: <p>Manage your profile details and display name.</p> },
            { id: 'security', label: 'Security', content: <p>Review password and sign-in settings.</p> },
            { id: 'notifications', label: 'Notifications', content: <p>Choose which updates you receive.</p> },
          ]}
        />
      );
    case 'accordion':
      return (
        <Accordion
          multiple
          items={[
            { id: 'overview', title: 'What is this component library?', content: <p>A collection of reusable React components with documented keyboard and accessibility behavior.</p> },
            { id: 'accessibility', title: 'How should I test accessibility?', content: <p>Combine automated checks with keyboard-only review and testing with assistive technology.</p> },
            { id: 'disabled', title: 'Unavailable section', content: <p>This section cannot currently be opened.</p>, disabled: true },
          ]}
        />
      );
    case 'select':
      return (
        <Select
          label="Choose a plan"
          placeholder="Select a plan"
          options={[
            { value: 'starter', label: 'Starter', description: 'For personal projects', icon: <span>◈</span> },
            { value: 'team', label: 'Team', description: 'Shared tools for small teams', icon: <span>◉</span> },
            { value: 'enterprise', label: 'Enterprise', description: 'Advanced controls and support', icon: <span>◆</span> },
          ]}
        />
      );
    case 'radio-group':
      return (
        <RadioGroup
          name="preview-contact-method"
          legend="Preferred contact method"
          hint="Choose one way for us to contact you."
          options={[
            { value: 'email', label: 'Email', description: 'Replies usually arrive within one business day.' },
            { value: 'phone', label: 'Phone', description: 'Available during business hours.' },
            { value: 'none', label: 'Do not contact me', disabled: true },
          ]}
          defaultValue="email"
          required
        />
      );
    case 'combobox':
      return (
        <Combobox
          label="Search a city"
          hint="Choose a suggestion or enter another city."
          placeholder="Type a city name"
          allowCustomValue
          options={[
            { value: 'new-york', label: 'New York', description: 'United States' },
            { value: 'london', label: 'London', description: 'United Kingdom' },
            { value: 'tokyo', label: 'Tokyo', description: 'Japan' },
            { value: 'sydney', label: 'Sydney', description: 'Australia' },
          ]}
        />
      );
    case 'menu-button':
      return (
        <div className="space-y-4">
          <MenuButton
            label="Document actions"
            items={[
              { id: 'rename', label: 'Rename document', onSelect: () => setMenuMessage('Rename action selected.') },
              { id: 'duplicate', label: 'Make a copy', onSelect: () => setMenuMessage('Copy action selected.') },
              { id: 'archive', label: 'Archive document', onSelect: () => setMenuMessage('Archive action selected.') },
              { id: 'delete', label: 'Delete document', onSelect: () => setMenuMessage('Delete unavailable for this example.'), disabled: true },
            ]}
          />
          <p role="status" className="text-sm text-slate-600">{menuMessage}</p>
        </div>
      );
    case 'inline-alert':
      return (
        <div className="max-w-xl space-y-3">
          <InlineAlert variant="info" title="Information">Your profile is visible only to workspace members.</InlineAlert>
          <InlineAlert variant="success" title="Saved">Your preferences have been updated.</InlineAlert>
          <InlineAlert variant="warning" title="Review required">Some details need your attention before publishing.</InlineAlert>
          <InlineAlert variant="error" title="Could not save">Check your connection and try again.</InlineAlert>
        </div>
      );
    case 'breadcrumbs':
      return (
        <Breadcrumbs
          label="Page location"
          items={[
            { label: 'Documentation', href: '#overview' },
            { label: 'Components', href: '#components' },
            { label: 'Breadcrumbs' },
          ]}
        />
      );
    case 'stepper':
      return (
        <Stepper
          steps={[
            { id: 'account', label: 'Account', description: 'Create your profile' },
            { id: 'details', label: 'Details', description: 'Add information' },
            { id: 'finish', label: 'Finish', description: 'Review and complete' },
          ]}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          label="Setup progress"
        />
      );
    case 'tree-view':
      return (
        <TreeView
          label="Project files"
          defaultExpandedIds={['src', 'components']}
          defaultSelectedId="button-tsx"
          items={[
            {
              id: 'src',
              label: 'src',
              children: [
                {
                  id: 'components',
                  label: 'components',
                  children: [
                    { id: 'button-tsx', label: 'Button.tsx' },
                    { id: 'input-tsx', label: 'Input.tsx' },
                  ],
                },
                { id: 'app-tsx', label: 'App.tsx' },
              ],
            },
            { id: 'readme', label: 'README.md' },
          ]}
        />
      );
    case 'command-palette':
      return (
        <div className="space-y-4">
          <CommandPalette
            items={[
              { id: 'new', label: 'Create new document', description: 'Start with a blank document', keywords: ['add'], onSelect: () => setCommandMessage('New document action selected.') },
              { id: 'settings', label: 'Open settings', description: 'Manage preferences', onSelect: () => setCommandMessage('Settings action selected.') },
              { id: 'help', label: 'View help', description: 'Read accessibility guidance', onSelect: () => setCommandMessage('Help action selected.') },
            ]}
          />
          <p role="status" className="text-sm text-slate-600">{commandMessage}</p>
        </div>
      );
    case 'avatar-group':
      return (
        <div className="space-y-3">
          <AvatarGroup
            label="Project collaborators"
            max={3}
            avatars={[
              { alt: 'Jordan Lee', name: 'Jordan Lee' },
              { alt: 'Avery Chen', name: 'Avery Chen' },
              { alt: 'Morgan Patel', name: 'Morgan Patel' },
              { alt: 'Sam Rivera', name: 'Sam Rivera' },
              { alt: 'Taylor Kim', name: 'Taylor Kim' },
            ]}
          />
          <p className="text-sm text-slate-600">Three shown, with the remaining collaborator count exposed to assistive technology.</p>
        </div>
      );
    case 'language-switcher':
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-5">
            <LanguageSwitcher
              label="Language (select)"
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              languages={[
                { tag: 'en', label: 'English' },
                { tag: 'de', label: 'Deutsch' },
                { tag: 'es', label: 'Español' },
                { tag: 'fr', label: 'Français' },
              ]}
            />
            <LanguageSwitcher
              variant="menu"
              label="Language"
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              languages={[
                { tag: 'en', label: 'English' },
                { tag: 'de', label: 'Deutsch' },
                { tag: 'es', label: 'Español' },
                { tag: 'fr', label: 'Français' },
              ]}
            />
          </div>
          <p role="status" className="text-sm text-slate-600">Selected locale: {selectedLanguage}. The consuming app is responsible for applying translations.</p>
        </div>
      );
    case 'date-range':
      return <DateRangePicker label="Report date range" />;
    case 'tooltip':
      return (
        <div className="flex min-h-40 items-center justify-center">
          <Tooltip content="This detail is supplementary; the visible label still describes the action.">
            <span className="cursor-help rounded border border-dashed border-blue-500 px-4 py-3 text-sm font-medium text-blue-800">
              Focus or hover to show a tooltip
            </span>
          </Tooltip>
        </div>
      );
    case 'file-uploader':
      return (
        <FileUploader
          label="Choose files to upload"
          accept=".pdf,image/*"
          maxFiles={3}
          maxFileSize={5 * 1024 * 1024}
          onUpload={async (_file, reportProgress) => {
            reportProgress(35);
            await new Promise((resolve) => setTimeout(resolve, 250));
            reportProgress(75);
            await new Promise((resolve) => setTimeout(resolve, 250));
          }}
        />
      );
    case 'form-field':
      return (
        <FormField
          id="preview-contact-email"
          label="Email address"
          hint="Use an address where we can reach you."
          error="Enter a valid email address."
          required
        >
          <input
            type="email"
            className="min-h-11 w-full max-w-md rounded-md border border-slate-300 px-3 py-2 focus-visible:outline-2 focus-visible:outline-blue-700"
          />
        </FormField>
      );
    case 'form-error-summary':
      return (
        <div className="space-y-5">
          <FormErrorSummary
            heading="Review the following fields"
            errors={[
              { id: 'preview-name', label: 'Full name', message: 'Enter your name.' },
              { id: 'preview-email', label: 'Email address', message: 'Enter a valid email address.' },
            ]}
          />
          <FormField id="preview-name" label="Full name" error="Enter your name." required>
            <input className="min-h-11 w-full max-w-md rounded-md border border-slate-300 px-3 py-2" />
          </FormField>
          <FormField id="preview-email" label="Email address" error="Enter a valid email address." required>
            <input type="email" className="min-h-11 w-full max-w-md rounded-md border border-slate-300 px-3 py-2" />
          </FormField>
        </div>
      );
    case 'data-table':
      return (
        <DataTable
          caption="Team directory"
          pageSize={3}
          getRowId={(person) => person.email}
          columns={[
            { id: 'name', header: 'Name', accessor: 'name', width: 190, minWidth: 120 },
            { id: 'team', header: 'Team', accessor: 'team', width: 150 },
            { id: 'role', header: 'Role', accessor: 'role', width: 180 },
            { id: 'email', header: 'Email', accessor: 'email', width: 240 },
          ]}
          data={[
            { name: 'Avery Chen', team: 'Design', role: 'Product designer', email: 'avery@example.com' },
            { name: 'Morgan Patel', team: 'Engineering', role: 'Frontend engineer', email: 'morgan@example.com' },
            { name: 'Jordan Lee', team: 'Research', role: 'Research lead', email: 'jordan@example.com' },
            { name: 'Sam Rivera', team: 'Engineering', role: 'Accessibility engineer', email: 'sam@example.com' },
            { name: 'Taylor Kim', team: 'Design', role: 'Content designer', email: 'taylor@example.com' },
            { name: 'Riley Brooks', team: 'Operations', role: 'Program manager', email: 'riley@example.com' },
          ]}
        />
      );
    case 'modal':
      return (
        <>
          <Button onClick={() => setIsModalOpen(true)}>Open dialog</Button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example dialog">
            <p className="mb-5">Modal dialogs keep keyboard focus on the dialog while it is open.</p>
            <Button onClick={() => setIsModalOpen(false)}>Close dialog</Button>
          </Modal>
        </>
      );
    case 'accessible-form':
      return <AccessibleFormExample />;
    case 'multi-step-form':
      return <AccessibleMultiStepForm />;
    case 'site-header':
      return <SiteHeader brand="Inclusive Studio" homeHref="#home" position="fixed" links={[
        { label: 'Components', href: '#components' },
        { label: 'Guides', href: '#guides' },
        { label: 'About', href: '#about' },
      ]} />;
    case 'site-sidebar':
      return <SiteSidebar label="Documentation sections" title="On this page" items={[
        { label: 'Getting started', href: '#getting-started' },
        { label: 'Components', href: '#components', current: true },
        { label: 'Accessibility', href: '#accessibility' },
      ]} className="max-w-xs" />;
    case 'popup-sidebar':
      return <PopupSidebar label="Site navigation" title="Explore" triggerLabel="Open site navigation" items={[
        { label: 'Home', href: '#home' },
        { label: 'Components', href: '#components', current: true },
        { label: 'Guides', href: '#guides' },
        { label: 'Contact', href: '#contact' },
      ]} />;
    case 'site-footer':
      return <SiteFooter variant="columns" brand="Inclusive Studio" description="Building clear, accessible digital experiences." copyright="© 2026 Inclusive Studio" columns={[
        { heading: 'Explore', links: [{ label: 'Components', href: '#components' }, { label: 'Patterns', href: '#patterns' }] },
        { heading: 'Support', links: [{ label: 'Accessibility', href: '#accessibility' }, { label: 'Contact', href: '#contact' }] },
      ]} />;
    case 'content-block':
      return <div className="max-w-3xl space-y-4"><ContentBlock title="Accessible by default" description="Group related information into a clearly named section." variant="bordered"><p>Content blocks create consistent hierarchy without changing the semantics of the content inside.</p></ContentBlock><ContentBlock title="Next steps" headingLevel="h3" variant="accent"><p>Use the accent treatment sparingly and keep text contrast strong.</p></ContentBlock></div>;
    case 'hero':
      return (
        <Hero
          eyebrow="Accessible by design"
          title="Build experiences everyone can use"
          headingLevel="h2"
          description="A clear introduction helps people understand what this page offers and where to go next."
          actions={[
            { label: 'Explore components', href: '#components' },
            { label: 'Read accessibility notes', href: '#accessibility' },
          ]}
        />
      );
    case 'content-list':
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold text-slate-900">Unordered list</h3>
            <ContentList items={[
              { id: 'semantic', content: 'Use semantic HTML' },
              { id: 'keyboard', content: 'Support keyboard interaction' },
              { id: 'test', content: 'Test with assistive technology' },
            ]} />
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-slate-900">Ordered steps</h3>
            <ContentList ordered label="Getting started" items={[
              { id: 'install', content: 'Install the package' },
              { id: 'import', content: 'Import the component' },
              { id: 'verify', content: 'Verify the accessible name' },
            ]} />
          </div>
        </div>
      );
    case 'article':
      return (
        <Article
          eyebrow="Accessibility"
          title="Designing useful status messages"
          author="Martina"
          published={{ dateTime: '2026-10-09', label: 'October 9, 2026' }}
          image={{
            src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23dbeafe%22/%3E%3Crect x=%2270%22 y=%2255%22 width=%22500%22 height=%22250%22 rx=%2218%22 fill=%22white%22/%3E%3Crect x=%22105%22 y=%2290%22 width=%22220%22 height=%2222%22 rx=%2211%22 fill=%22%231e3a8a%22/%3E%3Crect x=%22105%22 y=%22135%22 width=%22425%22 height=%2212%22 rx=%226%22 fill=%22%2394a3b8%22/%3E%3Crect x=%22105%22 y=%22162%22 width=%22390%22 height=%2212%22 rx=%226%22 fill=%22%23cbd5e1%22/%3E%3Crect x=%22105%22 y=%22202%22 width=%22425%22 height=%2270%22 rx=%2210%22 fill=%22%23eff6ff%22/%3E%3C/svg%3E',
            alt: 'Illustration of a status message in a user interface',
            caption: 'Status messages should be clear without relying on color.',
          }}
        >
          <p>Status messages should explain what happened and what the user can do next.</p>
          <p>Use text in addition to color, and choose announcement urgency based on how important the update is.</p>
        </Article>
      );
    case 'link-list':
      return (
        <LinkList
          label="Accessibility resources"
          links={[
            { href: '#keyboard-guide', label: 'Keyboard testing guide', description: 'Review focus order and interaction without a pointer.' },
            { href: '#screen-reader-guide', label: 'Screen reader testing', description: 'Check names, roles, states, and announcements.' },
            { href: '#contrast-guide', label: 'Color contrast guidance', description: 'Make text and controls perceivable.' },
          ]}
        />
      );
    case 'icon-list':
      return (
        <IconList items={[
          { id: 'keyboard', icon: '⌨', title: 'Keyboard ready', description: 'Reach every interactive control without a mouse.' },
          { id: 'contrast', icon: '◐', title: 'Clear contrast', description: 'Read labels and status in varied lighting.' },
          { id: 'feedback', icon: '✓', title: 'Helpful feedback', description: 'Understand errors and how to resolve them.' },
          { id: 'responsive', icon: '↔', title: 'Responsive layouts', description: 'Use the interface across different screen sizes.' },
        ]} />
      );
    case 'cta-banner':
      return (
        <CTABanner
          title="Ready to improve your interface?"
          description="Explore accessible patterns and put them to work in your next project."
          action={{ label: 'Browse components', href: '#components' }}
          secondaryAction={{ label: 'Read the guide', href: '#guide' }}
        />
      );
    case 'image':
      return (
        <AccessibleImage
          src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23dbeafe%22/%3E%3Ccircle cx=%22320%22 cy=%22150%22 r=%2270%22 fill=%22%232563eb%22/%3E%3Cpath d=%22M80 300 220 190l90 75 90-100 160 135z%22 fill=%22%231e3a8a%22/%3E%3C/svg%3E"
          alt="Blue circle above a stylized mountain landscape"
          caption="An image can include a visible caption when context or attribution is useful."
          width={640}
          height={360}
          className="w-full max-w-xl"
        />
      );
    case 'video':
      return (
        <VideoPlayer
          label="Sample flower video"
          sources={[{ src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', type: 'video/mp4' }]}
          captions={[{ src: '/media/flower-captions.vtt', label: 'English captions', srcLang: 'en' }]}
          description="A sample video player. Replace the example caption track with accurate captions for your own media."
          transcriptHref="#flower-transcript"
        />
      );
    case 'audio':
      return (
        <AudioPlayer
          label="Sample audio recording"
          sources={[{ src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', type: 'audio/mpeg' }]}
          description="A short sample recording with a link to its text alternative."
          transcriptHref="#audio-transcript"
        />
      );
    case 'media-text':
      return (
        <MediaText
          title="Design for different ways of perceiving"
          headingLevel="h2"
          imageSide="start"
          image={{
            src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 420%22%3E%3Crect width=%22640%22 height=%22420%22 fill=%22%23eff6ff%22/%3E%3Crect x=%22100%22 y=%2270%22 width=%22440%22 height=%22280%22 rx=%2220%22 fill=%22white%22 stroke=%22%2393c5fd%22 stroke-width=%226%22/%3E%3Ccircle cx=%22180%22 cy=%22150%22 r=%2230%22 fill=%22%232563eb%22/%3E%3Crect x=%22230%22 y=%22134%22 width=%22230%22 height=%2230%22 rx=%2215%22 fill=%22%231e3a8a%22/%3E%3Crect x=%22140%22 y=%22210%22 width=%22360%22 height=%2218%22 rx=%229%22 fill=%22%2394a3b8%22/%3E%3Crect x=%22140%22 y=%22250%22 width=%22300%22 height=%2218%22 rx=%229%22 fill=%22%23cbd5e1%22/%3E%3C/svg%3E',
            alt: 'Illustration of text paired with a clear visual status indicator',
            caption: 'Meaningful visuals support, but do not replace, clear text.',
          }}
        >
          <p>Pair media with text that makes the purpose and important details clear.</p>
          <p>Do not make users rely on an image alone to understand a feature or instruction.</p>
        </MediaText>
      );
    case 'captcha':
      return (
        <CaptchaField
          verified={false}
          challenge={
            <div className="rounded-md border border-dashed border-slate-400 bg-slate-50 p-4 text-sm text-slate-700">
              A real CAPTCHA provider challenge mounts here. This preview does not verify users.
            </div>
          }
        />
      );
    case 'login':
      return (
        <div className="space-y-3">
          <LoginForm
            onSubmit={async () => {
              await new Promise((resolve) => setTimeout(resolve, 200));
              setLoginMessage('Demo sign-in callback completed. No credentials were sent to a server.');
            }}
          />
          <p role="note" className="text-sm text-slate-600">{loginMessage}</p>
        </div>
      );
    case 'blockquote':
      return <div className="max-w-prose space-y-3"><Blockquote cite="https://example.com/accessibility">Accessibility is not a feature to add at the end; it is a quality of the whole experience.</Blockquote><p className="text-sm text-slate-600">— Project accessibility principles</p></div>;
    case 'quote':
      return <p className="max-w-prose leading-7">The interface should be <Quote cite="https://example.com">clear, predictable, and inclusive</Quote> for the people using it.</p>;
    case 'code':
      return <p>Run <Code>pnpm test</Code> before requesting review.</p>;
    case 'link':
      return <div className="space-y-3"><p><Link href="#accessibility">Read the accessibility guidance</Link></p><p><Link href="https://www.w3.org/WAI/" external>Visit W3C WAI</Link></p></div>;
    case 'icon-button':
      return <div className="flex items-center gap-3"><IconButton label="Close example" icon="×" onClick={() => setMenuMessage('Close action activated.')} /><p role="status">{menuMessage}</p></div>;
    case 'spinner':
      return <Spinner label="Saving your preferences" />;
    case 'separator':
      return <div className="space-y-4"><p>Account details</p><Separator /><p>Notification preferences</p><div className="flex h-12 items-center gap-4"><span>Left</span><Separator orientation="vertical" /><span>Right</span></div></div>;
    case 'textarea':
      return <TextArea label="Additional comments" hint="Share any context that may help us respond." rows={4} placeholder="Write a message" />;
    case 'switch':
      return <Switch label="Email me product updates" checked={switchEnabled} onChange={setSwitchEnabled} />;
    case 'slider':
      return <div className="max-w-xl space-y-3"><Slider label="Volume" min={0} max={100} value={sliderValue} onChange={setSliderValue} /><p role="status">Volume: {sliderValue}%</p></div>;
    case 'radio-cards':
      return <RadioCards name="plan" legend="Choose a plan" value={radioCardValue} onChange={setRadioCardValue} options={[
        { value: 'starter', label: 'Starter', description: 'For individual projects.' },
        { value: 'standard', label: 'Standard', description: 'Shared tools for small teams.' },
        { value: 'enterprise', label: 'Enterprise', description: 'Advanced support and controls.' },
      ]} />;
    case 'checkbox-cards':
      return <CheckboxCards name="updates" legend="Choose updates" hint="Select all topics you want to receive." defaultValue={['release']} options={[
        { value: 'release', label: 'Product releases', description: 'New features and fixes.' },
        { value: 'events', label: 'Events', description: 'Workshops and community sessions.' },
      ]} />;
    case 'segmented-control':
      return <div className="space-y-3"><SegmentedControl label="Calendar view" value={segmentsValue} onChange={setSegmentsValue} options={[
        { value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' },
      ]} /><p role="status">Showing {segmentsValue} view.</p></div>;
    case 'context-menu':
      return <ContextMenu label="Example content actions" items={[
        { id: 'copy', label: 'Copy title', onSelect: () => setMenuMessage('Title copied in this example.') },
        { id: 'share', label: 'Share', onSelect: () => setMenuMessage('Share action selected.') },
        { id: 'archive', label: 'Archive', onSelect: () => setMenuMessage('Archive unavailable.'), disabled: true },
      ]}><div className="rounded-lg border border-dashed border-slate-400 p-8 text-slate-800">Right-click here, or focus and press Shift+F10.</div><p role="status" className="mt-3">{menuMessage}</p></ContextMenu>;
    case 'data-list':
      return <Card title="Account details" className="p-5"><DataList items={[
        { label: 'Name', value: 'Jordan Lee' }, { label: 'Account type', value: 'Team member' }, { label: 'Status', value: <span className="font-medium text-green-800">Active</span> },
      ]} /></Card>;
    case 'popover':
      return <Popover label="Notification preferences" trigger="Notification details"><p>Choose how often you receive updates. Changes apply to this example only.</p><a className="mt-3 inline-block text-blue-800 underline" href="#notification-settings">Review settings</a></Popover>;
    case 'hover-card':
      return <p>Created by <HoverCard trigger={<a className="text-blue-800 underline" href="#author">Jordan Lee</a>}><span>Jordan designs inclusive interfaces and writes about accessible product patterns.</span></HoverCard>.</p>;
    case 'scroll-area':
      return <ScrollArea label="Scrollable accessibility checklist" maxHeight="12rem" className="max-w-xl p-4"><ul className="list-disc space-y-3 pl-5">{['Check headings and landmarks', 'Test every action using only a keyboard', 'Verify visible focus and contrast', 'Test at 200% zoom', 'Review labels and announcements', 'Respect reduced-motion settings'].map((item) => <li key={item}>{item}</li>)}</ul></ScrollArea>;
    case 'carousel':
      return <Carousel label="Accessibility principles" slides={[
        <div key="one"><h3 className="font-semibold">Perceivable</h3><p>Provide text alternatives and meaningful structure.</p></div>,
        <div key="two"><h3 className="font-semibold">Operable</h3><p>Make every interaction work with a keyboard.</p></div>,
        <div key="three"><h3 className="font-semibold">Understandable</h3><p>Use clear instructions and predictable behavior.</p></div>,
      ]} />;
    case 'dialog':
      return <><Button onClick={() => setDialogOpen(true)}>Open dialog</Button><Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Confirm changes"><p className="mb-5">The existing modal behavior keeps keyboard focus inside the dialog.</p><Button onClick={() => setDialogOpen(false)}>Close dialog</Button></Dialog></>;
    case 'aspect-ratio':
      return <AspectRatio ratio={16 / 9} className="max-w-xl rounded-lg bg-slate-200"><div className="flex h-full items-center justify-center text-slate-800">16:9 responsive media frame</div></AspectRatio>;
    case 'card':
      return <Card title="Project status" className="max-w-lg p-5"><h3 className="text-lg font-semibold">Accessibility review</h3><p className="mt-2 text-slate-700">Keyboard testing is in progress.</p><p className="mt-3 text-sm font-medium text-blue-800">Updated today</p></Card>;
    case 'inset':
      return <div className="max-w-lg rounded-lg border border-dashed border-slate-400"><Inset space={6} className="bg-blue-50"><p className="font-medium">Inset content</p><p className="mt-2 text-sm text-slate-700">Consistent inner spacing without changing semantics.</p></Inset></div>;
    case 'layout-primitives':
      return <Container className="rounded-lg bg-slate-50 py-5"><Stack gap={4}><h3 className="font-semibold">Responsive layout</h3><Cluster><span className="rounded bg-blue-100 px-3 py-1">Cluster item</span><span className="rounded bg-blue-100 px-3 py-1">Wraps naturally</span></Cluster><Grid minItemWidth="10rem"><Card className="p-4">Responsive grid item</Card><Card className="p-4">Another item</Card></Grid></Stack></Container>;
    case 'theme-system':
      return       <ThemeProvider defaultTheme="system"><Card className="space-y-4 p-5"><ThemeControl /><p className="text-slate-700">Theme preference: light, dark, or follow your operating system. The provider applies the preference to document tokens for theme-aware consumers.</p></Card></ThemeProvider>;
    case 'styling-guide':
      return <Card title="Styling guidance" className="max-w-2xl space-y-4 p-5"><h3 className="text-lg font-semibold">Consistent, accessible styling</h3><p>Use shared tokens for color, typography, and surfaces. Keep a visible focus indicator in every theme.</p><p>Use <Code>className</Code> for layout adjustments, not to remove component semantics or keyboard affordances.</p><Separator /><p>Test contrast, zoom, forced colors, and reduced motion after overrides.</p></Card>;
    case 'release-guide':
      return <Card title="Release checklist" className="max-w-2xl p-5"><h3 className="text-lg font-semibold">Before a release</h3><ol className="mt-3 list-decimal space-y-2 pl-5"><li>Review changes and breaking API impact.</li><li>Run typecheck, tests, dashboard build, and Storybook build.</li><li>Keyboard-test interactive changes and update accessibility notes.</li><li>Update release notes and version according to semantic versioning.</li></ol></Card>;
  }
}

export default function ComponentGallery() {
  const [selectedId, setSelectedId] = useState<ComponentId | 'overview'>('overview');
  const [mobileGroup, setMobileGroup] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const selectedComponent = componentList.find((component) => component.id === selectedId);
  const mobileGroupComponents = componentGroups.find((group) => group.name === mobileGroup)?.items ?? [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 xl:grid xl:grid-cols-[260px_minmax(0,1fr)]">
      <SkipLink />
      <aside className="hidden border-b border-slate-200 bg-white xl:fixed xl:inset-y-0 xl:block xl:w-65 xl:overflow-y-auto xl:border-b-0 xl:border-r">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
          <button type="button" onClick={() => {
            setSelectedId('overview');
            setMobileGroup('');
            setMobileMenuOpen(false);
          }} className="text-left">
            <span className="block text-sm font-bold tracking-tight text-slate-900">MARTINA UI</span>
            <span className="mt-1 block text-xs text-slate-500">Component documentation</span>
          </button>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {componentList.length} items
          </span>
        </div>

        <nav aria-label="Component documentation" className="space-y-5 px-3 py-5">
          <button
            type="button"
            onClick={() => {
              setSelectedId('overview');
              setMobileGroup('');
              setMobileMenuOpen(false);
            }}
            aria-current={selectedId === 'overview' ? 'page' : undefined}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
              selectedId === 'overview' ? 'bg-blue-50 text-blue-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Overview</span>
            <span aria-hidden="true">⌂</span>
          </button>

          {componentGroups.map((group) => (
            <div key={group.name}>
              <h2 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {group.name}
              </h2>
              <ul className="space-y-1">
                {group.items.map((component) => (
                  <li key={component.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(component.id);
                        setMobileGroup(group.name);
                      }}
                      aria-current={selectedId === component.id ? 'page' : undefined}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        selectedId === component.id
                          ? 'bg-blue-50 font-semibold text-blue-800'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
                      {component.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

      </aside>

      <div className="min-w-0 xl:col-start-2 xl:ml-0">
        <nav aria-label="Mobile component navigation" className="border-b border-slate-200 bg-white px-4 py-3 xl:hidden sm:px-6">
          <button
            ref={mobileMenuButtonRef}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-component-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex min-h-11 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 text-left text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span aria-hidden="true" className="text-lg leading-none">{mobileMenuOpen ? '×' : '☰'}</span>
              <span className="truncate">{selectedComponent ? `${selectedComponent.group} / ${selectedComponent.name}` : 'Browse components'}</span>
            </span>
            <span aria-hidden="true" className="ml-3 text-slate-500">{mobileMenuOpen ? '⌃' : '⌄'}</span>
          </button>
          {mobileMenuOpen && (
            <div
              id="mobile-component-menu"
              className="mt-3 max-h-[55vh] overflow-y-auto rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setMobileMenuOpen(false);
                  mobileMenuButtonRef.current?.focus();
                }
              }}
            >
              {mobileGroup ? (
                <div>
                  <div className="mb-2 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <button
                      type="button"
                      onClick={() => setMobileGroup('')}
                      className="min-h-10 rounded-md px-3 text-sm font-medium text-blue-800 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-700"
                    >
                      <span aria-hidden="true">←</span> Back
                    </button>
                    <h2 className="text-sm font-semibold text-slate-800">{mobileGroup}</h2>
                  </div>
                  <ul aria-label={`${mobileGroup} components`} className="space-y-1">
                    {mobileGroupComponents.map((component) => (
                      <li key={component.id}>
                        <button
                          type="button"
                          aria-current={selectedId === component.id ? 'page' : undefined}
                          onClick={() => {
                            setSelectedId(component.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`min-h-10 w-full rounded-md px-3 text-left text-sm ${
                            selectedId === component.id
                              ? 'bg-blue-50 font-semibold text-blue-800'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {component.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <h2 className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Choose a category</h2>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId('overview');
                      setMobileMenuOpen(false);
                    }}
                    aria-current={selectedId === 'overview' ? 'page' : undefined}
                    className="min-h-10 w-full rounded-md px-3 text-left text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Overview
                  </button>
                  <ul className="space-y-1">
                    {componentGroups.map((group) => (
                      <li key={group.name}>
                        <button
                          type="button"
                          onClick={() => setMobileGroup(group.name)}
                          className="flex min-h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700"
                        >
                          <span>{group.name}</span>
                          <span className="flex items-center gap-2 text-xs text-slate-500">
                            {group.items.length}<span aria-hidden="true">›</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </nav>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-8">
          <div className="text-sm text-slate-500">Documentation <span className="px-1 text-slate-300">/</span> <span className="font-medium text-slate-800">{selectedComponent?.name ?? 'Overview'}</span></div>
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">UI library</span>
        </header>

        <main id="main-content" tabIndex={-1} className="mx-auto max-w-6xl space-y-8 p-5 sm:p-8 focus:outline-2 focus:outline-blue-700">
          {selectedComponent ? (
            <>
              <section className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">{selectedComponent.group}</p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">{selectedComponent.name}</h1>
                <p className="max-w-3xl text-base leading-7 text-slate-600">{selectedComponent.description}</p>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-slate-900">Usage preview</h2>
                  <p className="mt-1 text-sm text-slate-500">Try the component and inspect its available styles.</p>
                </div>
                <ComponentPreview key={selectedComponent.id} id={selectedComponent.id} />
              </section>

              <section className="grid gap-6 xl:grid-cols-2">
                <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900">Variants and states</h2>
                  <ul className="mt-4 divide-y divide-slate-100">
                    {selectedComponent.variants.map((variant) => (
                      <li key={variant} className="py-3 text-sm leading-6 text-slate-600">{variant}</li>
                    ))}
                  </ul>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900">Accessibility notes</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{componentDocumentation[selectedComponent.id].accessibility}</p>
                  <h3 className="mt-5 text-sm font-semibold text-slate-900">Keyboard interaction</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{componentDocumentation[selectedComponent.id].keyboard}</p>
                </article>
              </section>

              <section className="grid gap-6 xl:grid-cols-2">
                <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900">When to use it</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{componentDocumentation[selectedComponent.id].usage}</p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900">Props and API</h2>
                  <ul className="mt-3 space-y-2">
                    {componentDocumentation[selectedComponent.id].api.map((detail) => (
                      <li key={detail} className="text-sm leading-6 text-slate-600">{detail}</li>
                    ))}
                  </ul>
                </article>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Library dashboard</p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">Component documentation</h1>
                <p className="max-w-3xl text-base leading-7 text-slate-600">
                  A text-first guide to the components, their variants, and their intended use.
                  Choose a component in the sidebar to open its documentation and interactive preview.
                </p>
              </section>

              <section aria-label="Library summary" className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Components', value: String(componentList.length) },
                  { label: 'Categories', value: String(componentGroups.length) },
                  { label: 'Variants and states', value: String(componentList.reduce((count, component) => count + component.variants.length, 0)) },
                ].map((stat) => (
                  <article key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-950">{stat.value}</p>
                  </article>
                ))}
              </section>

              {componentGroups.map((group) => (
                <section key={group.name} aria-labelledby={`group-${group.name}`} className="space-y-4">
                  <div>
                    <h2 id={`group-${group.name}`} className="text-xl font-semibold text-slate-900">{group.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{group.items.length} documented components</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((component) => (
                      <button
                        key={component.id}
                        type="button"
                        onClick={() => setSelectedId(component.id)}
                        className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                      >
                        <span className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{component.name}</span>
                          <span aria-hidden="true" className="text-blue-700">→</span>
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-slate-600">{component.description}</span>
                        <span className="mt-4 block text-xs font-medium text-slate-500">
                          {component.variants.length} variants or states
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
