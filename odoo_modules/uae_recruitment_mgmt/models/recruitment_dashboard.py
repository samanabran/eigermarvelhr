# -*- coding: utf-8 -*-
from odoo import api, fields, models, _
from odoo.tools import float_round
from datetime import datetime, timedelta


class RecruitmentDashboard(models.Model):
    """Dashboard for recruitment statistics with live data"""
    _name = 'recruitment.dashboard'
    _description = 'Recruitment Dashboard'
    
    # Basic fields (always ID 1 - singleton pattern)
    name = fields.Char(string='Name', default='Dashboard', readonly=True)
    currency_id = fields.Many2one('res.currency', string='Currency', 
                                   default=lambda self: self.env.company.currency_id,
                                   readonly=True)
    
    # Key Metrics - Computed Fields
    active_jobs = fields.Integer(string='Active Job Orders', compute='_compute_dashboard_stats')
    total_candidates = fields.Integer(string='Total Candidates', compute='_compute_dashboard_stats')
    interviews_today = fields.Integer(string='Interviews Today', compute='_compute_dashboard_stats')
    placements_month = fields.Integer(string='Placements This Month', compute='_compute_dashboard_stats')
    total_revenue = fields.Float(string='Total Revenue', compute='_compute_dashboard_stats')
    visa_in_progress = fields.Integer(string='Visa In Progress', compute='_compute_dashboard_stats')
    visa_completed = fields.Integer(string='Visa Completed', compute='_compute_dashboard_stats')
    total_clients = fields.Integer(string='Total Clients', compute='_compute_dashboard_stats')
    active_clients = fields.Integer(string='Active Clients', compute='_compute_dashboard_stats')
    
    # Job Statistics
    job_total = fields.Integer(string='Total Jobs', compute='_compute_job_stats')
    job_active = fields.Integer(string='Active Jobs', compute='_compute_job_stats')
    job_posted = fields.Integer(string='Posted Jobs', compute='_compute_job_stats')
    job_filled = fields.Integer(string='Filled Jobs', compute='_compute_job_stats')
    job_closed = fields.Integer(string='Closed Jobs', compute='_compute_job_stats')
    avg_time_to_fill = fields.Float(string='Avg Days to Fill', compute='_compute_job_stats')
    
    # Candidate Statistics
    candidate_total = fields.Integer(string='Total Candidates', compute='_compute_candidate_stats')
    candidate_new = fields.Integer(string='New Candidates', compute='_compute_candidate_stats')
    candidate_interview = fields.Integer(string='In Interview', compute='_compute_candidate_stats')
    candidate_offered = fields.Integer(string='Offered', compute='_compute_candidate_stats')
    candidate_high_match = fields.Integer(string='High Match (80%+)', compute='_compute_candidate_stats')
    candidate_good_match = fields.Integer(string='Good Match (50-79%)', compute='_compute_candidate_stats')
    
    # Revenue Statistics
    revenue_total = fields.Float(string='Total Revenue', compute='_compute_revenue_stats')
    revenue_commission = fields.Float(string='Total Commission', compute='_compute_revenue_stats')
    revenue_avg_commission = fields.Float(string='Avg Commission', compute='_compute_revenue_stats')
    total_placements = fields.Integer(string='Total Placements', compute='_compute_revenue_stats')
    
    @api.depends_context('uid')
    def _compute_dashboard_stats(self):
        """Compute main dashboard statistics"""
        for record in self:
            # Active job orders
            record.active_jobs = self.env['recruitment.job.order'].search_count([
                ('state', 'in', ['active', 'posted'])
            ])
            
            # Total candidates
            record.total_candidates = self.env['hr.applicant'].search_count([])
            
            # Interviews today
            today = fields.Date.today()
            record.interviews_today = self.env['calendar.event'].search_count([
                ('start_date', '=', today),
                ('description', 'ilike', 'interview')
            ])
            
            # Placements this month
            month_start = today.replace(day=1)
            record.placements_month = self.env['recruitment.placement'].search_count([
                ('placement_date', '>=', month_start),
                ('placement_date', '<=', today),
                ('state', '!=', 'cancelled')
            ])
            
            # Revenue stats
            placements = self.env['recruitment.placement'].search([
                ('state', '!=', 'cancelled')
            ])
            record.total_revenue = sum(p.final_amount or 0 for p in placements)
            
            # Visa stats
            record.visa_in_progress = self.env['uae.visa.processing'].search_count([
                ('state', 'not in', ['completed', 'rejected', 'cancelled'])
            ])
            
            record.visa_completed = self.env['uae.visa.processing'].search_count([
                ('state', '=', 'completed')
            ])
            
            # Client stats
            record.total_clients = self.env['recruitment.client'].search_count([
                ('state', '!=', 'terminated')
            ])
            
            record.active_clients = self.env['recruitment.client'].search_count([
                ('state', 'in', ['active', 'verified'])
            ])
    
    @api.depends_context('uid')
    def _compute_job_stats(self):
        """Compute job order statistics"""
        for record in self:
            job_orders = self.env['recruitment.job.order'].search([])
            
            record.job_total = len(job_orders)
            record.job_active = len(job_orders.filtered(lambda x: x.state == 'active'))
            record.job_posted = len(job_orders.filtered(lambda x: x.state == 'posted'))
            record.job_filled = len(job_orders.filtered(lambda x: x.state == 'filled'))
            record.job_closed = len(job_orders.filtered(lambda x: x.state == 'closed'))
            
            # Average time to fill
            filled_jobs = job_orders.filtered(lambda x: x.days_to_fill and x.days_to_fill > 0)
            if filled_jobs:
                record.avg_time_to_fill = sum(j.days_to_fill for j in filled_jobs) / len(filled_jobs)
            else:
                record.avg_time_to_fill = 0.0
    
    @api.depends_context('uid')
    def _compute_candidate_stats(self):
        """Compute candidate statistics"""
        for record in self:
            applicants = self.env['hr.applicant'].search([])
            
            record.candidate_total = len(applicants)
            
            # Stage-based counts
            record.candidate_new = len(applicants.filtered(
                lambda x: x.stage_id.name in ['New', 'Initial Qualification', 'Initial']
            ))
            record.candidate_interview = len(applicants.filtered(
                lambda x: 'interview' in (x.stage_id.name or '').lower()
            ))
            record.candidate_offered = len(applicants.filtered(
                lambda x: x.offer_status in ['sent', 'accepted']
            ))
            
            # AI matching stats
            record.candidate_high_match = len(applicants.filtered(lambda x: x.ai_match_score >= 80))
            record.candidate_good_match = len(applicants.filtered(lambda x: 50 <= x.ai_match_score < 80))
    
    @api.depends_context('uid')
    def _compute_revenue_stats(self):
        """Compute revenue statistics"""
        for record in self:
            placements = self.env['recruitment.placement'].search([
                ('state', '!=', 'cancelled')
            ])
            
            record.total_placements = len(placements)
            record.revenue_total = sum(p.final_amount or 0 for p in placements)
            record.revenue_commission = sum(p.commission_amount or 0 for p in placements)
            
            if record.total_placements > 0:
                record.revenue_avg_commission = record.revenue_commission / record.total_placements
            else:
                record.revenue_avg_commission = 0.0
    
    @api.model
    def get_dashboard_id(self):
        """Get or create the singleton dashboard record"""
        dashboard = self.search([], limit=1)
        if not dashboard:
            dashboard = self.create({'name': 'Dashboard'})
        return dashboard.id

    
    @api.model
    def get_recent_placements(self, limit=5):
        """Get recent placements for dashboard display"""
        placements = self.env['recruitment.placement'].search(
            [('state', '!=', 'cancelled')],
            limit=limit,
            order='placement_date desc'
        )
        
        return [{
            'id': p.id,
            'candidate': p.applicant_id.partner_name or 'Unknown',
            'job': p.job_order_id.name or 'N/A',
            'client': p.client_id.name or 'N/A',
            'date': str(p.placement_date) if p.placement_date else 'N/A',
            'salary': p.gross_salary or 0.0,
            'currency': p.currency_id.symbol if p.currency_id else 'AED',
        } for p in placements]
    
    @api.model
    def get_top_clients(self, limit=5):
        """Get top clients by placement count"""
        clients = self.env['recruitment.client'].search([
            ('state', '!=', 'terminated')
        ])
        
        client_data = []
        for client in clients:
            placement_count = len(client.placement_ids.filtered(lambda p: p.state != 'cancelled'))
            revenue = sum(p.final_amount or 0 for p in client.placement_ids if p.state != 'cancelled')
            
            if placement_count > 0:  # Only include clients with placements
                client_data.append({
                    'id': client.id,
                    'name': client.name,
                    'placements': placement_count,
                    'revenue': revenue,
                })
        
        # Sort by placements
        client_data.sort(key=lambda x: x['placements'], reverse=True)
        return client_data[:limit]
