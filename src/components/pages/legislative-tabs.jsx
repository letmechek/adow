"use client";

import { useMemo, useState } from "react";
import { sampleBills, sampleCommitteeWork, sampleSpeeches, sampleVotingRecords } from "@/data/sample-data";
import { formatDate } from "@/lib/utils";
import { Download, FileText, PlayCircle, Search, TrendingUp } from "lucide-react";

const billStages = ["Reading 1", "Reading 2", "Reading 3", "Passed"];

function BillsTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Bills Sponsored</p>
          <p className="text-xs text-slate-500">Highlighting key legislation tabled by Hon. Mohamed Adow.</p>
        </div>
        <TrendingUp className="h-5 w-5 text-primary" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-3 text-left">Bill Number</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Date Introduced</th>
              <th className="px-6 py-3 text-left">Co-Sponsors</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {sampleBills.map((bill) => (
              <tr key={bill.number} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">{bill.number}</td>
                <td className="px-6 py-4">{bill.title}</td>
                <td className="px-6 py-4">{formatDate(bill.dateIntroduced)}</td>
                <td className="px-6 py-4">{bill.coSponsors.join(", ")}</td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-primary">
                      <span>{bill.status}</span>
                      <span>
                        {bill.statusStage}/{billStages.length}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(bill.statusStage / billStages.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={bill.documentUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white"
                  >
                    <FileText className="h-4 w-4" />
                    PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CommitteeTab() {
  const { committees, meetings, reports } = sampleCommitteeWork;
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {committees.map((committee) => (
          <div
            key={committee.name}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Committee
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {committee.name}
            </h3>
            <p className="mt-2 text-sm text-slate-600">Role: {committee.role}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Upcoming Meetings</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {meetings.map((meeting) => (
            <div
              key={meeting.title}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {formatDate(meeting.date)} — {meeting.time}
              </p>
              <p className="mt-2 font-semibold text-slate-900">{meeting.title}</p>
              <p className="mt-1">Location: {meeting.location}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Published Reports</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {reports.map((report) => (
            <a
              key={report.title}
              href={report.documentUrl}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              <div>
                <p>{report.title}</p>
                <p className="text-xs text-slate-500">Published {formatDate(report.publishedOn)}</p>
              </div>
              <Download className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpeechesTab() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sampleSpeeches.map((speech) => (
        <div
          key={speech.title}
          className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="aspect-video overflow-hidden rounded-2xl">
            <iframe
              src={speech.videoUrl}
              title={speech.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {formatDate(speech.date)} • {speech.session}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{speech.title}</h3>
            <p className="mt-2 text-sm text-slate-600">Topic: {speech.topic}</p>
            <p className="mt-3 text-sm text-slate-600">{speech.transcript}</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white">
            <PlayCircle className="h-4 w-4" />
            Read Full Transcript
          </button>
        </div>
      ))}
    </div>
  );
}

function VotingTab() {
  const [topicFilter, setTopicFilter] = useState("All");
  const [voteFilter, setVoteFilter] = useState("All");
  const [search, setSearch] = useState("");

  const topics = useMemo(() => {
    const unique = new Set(sampleVotingRecords.map((record) => record.topic));
    return ["All", ...Array.from(unique)];
  }, []);

  const votes = ["All", "Yes", "No", "Abstain"];

  const filtered = useMemo(() => {
    return sampleVotingRecords.filter((record) => {
      const matchesTopic = topicFilter === "All" || record.topic === topicFilter;
      const matchesVote = voteFilter === "All" || record.vote === voteFilter;
      const matchesSearch = record.billName.toLowerCase().includes(search.toLowerCase());
      return matchesTopic && matchesVote && matchesSearch;
    });
  }, [topicFilter, voteFilter, search]);

  const handleExport = () => {
    const header = "Bill Name,Date,Vote,Topic\n";
    const rows = filtered
      .map((record) => `${record.billName},${formatDate(record.date)},${record.vote},${record.topic}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "voting-record.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by bill name"
              className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={topicFilter}
            onChange={(event) => setTopicFilter(event.target.value)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <select
            value={voteFilter}
            onChange={(event) => setVoteFilter(event.target.value)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {votes.map((vote) => (
              <option key={vote} value={vote}>
                {vote}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3 text-left">Bill Name</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Vote</th>
                <th className="px-6 py-3 text-left">Topic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filtered.map((record, index) => (
                <tr key={`${record.billName}-${index}`} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm font-semibold text-slate-900">{record.billName}</td>
                  <td className="px-6 py-3 text-sm">{formatDate(record.date)}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        record.vote === "Yes"
                          ? "bg-emerald-100 text-emerald-700"
                          : record.vote === "No"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {record.vote}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">{record.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function LegislativeTabs() {
  const tabs = [
    { key: "bills", label: "Bills Sponsored", content: <BillsTable /> },
    { key: "committee", label: "Committee Work", content: <CommitteeTab /> },
    { key: "speeches", label: "Speeches", content: <SpeechesTab /> },
    { key: "voting", label: "Voting Record", content: <VotingTab /> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const activeContent = useMemo(
    () => tabs.find((tab) => tab.key === activeTab)?.content,
    [activeTab, tabs]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? "bg-primary text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{activeContent}</div>
    </div>
  );
}
