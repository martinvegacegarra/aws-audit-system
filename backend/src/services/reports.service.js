const ec2Service = require('./ec2.service');
const logger = require('../utils/logger');

class ReportsService {
  async generateReport(services, format, region) {
    try {
      const data = {};

      if (services.includes('ec2')) {
        data.ec2 = await ec2Service.getFullInventory();
      }

      // Add other services here as they are implemented

      return this.formatReport(data, format);
    } catch (error) {
      logger.error('Error generating report:', error);
      throw error;
    }
  }

  formatReport(data, format) {
    switch (format.toLowerCase()) {
      case 'json':
        return data;
      case 'csv':
        return this.convertToCSV(data);
      case 'excel':
        return this.convertToExcel(data);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  convertToCSV(data) {
    let csv = '';
    
    // Process EC2 instances
    if (data.ec2?.instances) {
      csv += 'EC2 Instances\n';
      csv += 'Instance ID,Type,State,Launch Time\n';
      data.ec2.instances.forEach(instance => {
        csv += `${instance.InstanceId},${instance.InstanceType},${instance.State.Name},${instance.LaunchTime}\n`;
      });
      csv += '\n';
    }

    // Process EC2 volumes
    if (data.ec2?.volumes) {
      csv += 'EBS Volumes\n';
      csv += 'Volume ID,Size,State,Type\n';
      data.ec2.volumes.forEach(volume => {
        csv += `${volume.VolumeId},${volume.Size},${volume.State},${volume.VolumeType}\n`;
      });
      csv += '\n';
    }

    // Add other resource types as needed

    return csv;
  }

  convertToExcel(data) {
    // Implementation for Excel conversion would go here
    // This would typically use a library like 'xlsx' to generate Excel files
    throw new Error('Excel format not yet implemented');
  }
}

module.exports = new ReportsService();