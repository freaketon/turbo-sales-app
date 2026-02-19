/*
Design: Kinetic Energy Interface
- Stats dashboard with glassmorphic cards
- Visual charts and metrics
*/

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Trash2,
  ArrowLeft,
  Download
} from 'lucide-react';
import { getCallHistory, calculateStats, clearCallHistory, type CallRecord } from '@/lib/callHistory';
import { Link } from 'wouter';

export default function Dashboard() {
  const [history, setHistory] = useState<CallRecord[]>([]);
  const [stats, setStats] = useState(calculateStats([]));

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const callHistory = getCallHistory();
    setHistory(callHistory);
    setStats(calculateStats(callHistory));
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all call history? This cannot be undone.')) {
      clearCallHistory();
      loadHistory();
    }
  };

  const exportHistory = () => {
    const csv = generateCSV(history);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `outlier-sales-history-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateCSV = (records: CallRecord[]): string => {
    let csv = 'Date,Prospect Name,Company,Email,Outcome,Annual Cost,Monthly Cost\n';
    records.forEach(record => {
      const date = new Date(record.timestamp).toLocaleDateString();
      const annualCost = record.costAnalysis?.annualCost || 0;
      const monthlyCost = record.costAnalysis?.monthlyCost || 0;
      csv += `${date},"${record.prospectInfo.name}","${record.prospectInfo.company}","${record.prospectInfo.email}",${record.outcome},${annualCost},${monthlyCost}\n`;
    });
    return csv;
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Call Guide
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Call Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Track performance and identify patterns across your sales calls
            </p>
          </div>
          <div className="flex gap-2">
            {history.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportHistory}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearHistory}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </Button>
              </>
            )}
          </div>
        </div>

        {history.length === 0 ? (
          <motion.div
            className="glass-card rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Call History Yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Complete some sales calls to see analytics and insights here.
            </p>
            <Link href="/">
              <Button size="lg">
                Start Your First Call
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Calls */}
              <motion.div
                className="glass-card rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-primary" />
                  <span className="text-3xl font-bold text-foreground">
                    {stats.totalCalls}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Total Calls</p>
              </motion.div>

              {/* Qualification Rate */}
              <motion.div
                className="glass-card rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-accent" />
                  <span className="text-3xl font-bold text-foreground">
                    {stats.qualificationRate.toFixed(0)}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Qualification Rate</p>
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <span className="text-accent flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {stats.qualified}
                  </span>
                  <span className="text-destructive flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    {stats.disqualified}
                  </span>
                  {stats.inProgress > 0 && (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {stats.inProgress}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Average Annual Cost */}
              <motion.div
                className="glass-card rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-secondary" />
                  <span className="text-3xl font-bold text-foreground">
                    ${(stats.averageAnnualCost / 1000).toFixed(0)}k
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Avg Annual Cost</p>
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ ${stats.averageMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                </p>
              </motion.div>

              {/* Pipeline Value */}
              <motion.div
                className="glass-card rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                  <span className="text-3xl font-bold text-foreground">
                    ${(stats.totalPotentialRevenue / 1000).toFixed(0)}k
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
                <p className="text-xs text-muted-foreground mt-1">
                  From {stats.qualified} qualified calls
                </p>
              </motion.div>
            </div>

            {/* Recent Calls Table */}
            <motion.div
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Calls
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Prospect</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Company</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Outcome</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Annual Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 10).map((record, index) => (
                      <motion.tr
                        key={record.id}
                        className="border-b border-border/30 hover:bg-muted/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                      >
                        <td className="py-3 px-2 text-sm text-foreground/80">
                          {new Date(record.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2 text-sm text-foreground font-medium">
                          {record.prospectInfo.name}
                        </td>
                        <td className="py-3 px-2 text-sm text-foreground/80">
                          {record.prospectInfo.company}
                        </td>
                        <td className="py-3 px-2">
                          {record.outcome === 'qualified' && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                              <CheckCircle2 className="w-3 h-3" />
                              Qualified
                            </span>
                          )}
                          {record.outcome === 'disqualified' && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive">
                              <XCircle className="w-3 h-3" />
                              Disqualified
                            </span>
                          )}
                          {record.outcome === 'in-progress' && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              In Progress
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-sm text-foreground/80 text-right font-mono">
                          {record.costAnalysis 
                            ? `$${record.costAnalysis.annualCost.toLocaleString()}`
                            : '-'
                          }
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {history.length > 10 && (
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Showing 10 of {history.length} calls. Export CSV to see all.
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
